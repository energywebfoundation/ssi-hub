import { execFile, execFileSync, ChildProcess } from 'child_process';
import path from 'path';
import waitOn from 'wait-on';

/**
 * Spawn local ipfs cluster
 *
 * @returns uri of the cluster root
 */
export async function spawnIpfsCluster() {
  shutdownNodes();

  const cluster = execFile(
    'docker',
    ['compose', 'up', '--force-recreate', 'cluster_proxy'],
    { cwd: path.join(__dirname) },
    (error) => {
      if (error) {
        throw error;
      }
    }
  );

  try {
    await waitOn({
      // https://ipfscluster.io/documentation/reference/api/
      resources: ['http-get://localhost:8080/id'],
      delay: 5000,
      // if your internet connection is slow try to increase timeout to be able to download all images
      timeout: 30000,
    });

    return cluster;
  } catch (error) {
    shutdownIpfsCluster(cluster);
    throw error;
  }
}

export function shutdownIpfsCluster(cluster?: ChildProcess) {
  shutdownNodes();

  if (cluster !== undefined) {
    cluster.kill();
  }
}

function shutdownNodes() {
  execFileSync('docker', ['compose', 'down', '--volumes'], {
    cwd: path.join(__dirname),
    stdio: 'pipe',
  });
}
