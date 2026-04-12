import { spawn } from 'child_process';

export interface SpawnResult {
  stdout: string;
  stderr: string;
  exitCode: number;
}

export async function spawnPython(
  scriptPath: string,
  args: string[],
  opts: { timeoutMs?: number } = {}
): Promise<SpawnResult> {
  const pythonBin = process.env.PYTHON_BIN ?? 'python3';
  const timeoutMs = opts.timeoutMs ?? 300_000;

  return new Promise((resolve) => {
    const child = spawn(pythonBin, [scriptPath, ...args]);

    let stdout = '';
    let stderr = '';
    let timedOut = false;

    const timer = setTimeout(() => {
      timedOut = true;
      child.kill('SIGKILL');
    }, timeoutMs);

    child.stdout.on('data', (chunk: Buffer) => {
      stdout += chunk.toString();
    });

    child.stderr.on('data', (chunk: Buffer) => {
      const text = chunk.toString();
      stderr += text;
      process.stderr.write(text);
    });

    child.on('close', (code) => {
      clearTimeout(timer);
      if (timedOut) {
        resolve({ stdout: '', stderr: stderr + '\n[TIMEOUT]', exitCode: 1 });
      } else {
        resolve({ stdout, stderr, exitCode: code ?? 1 });
      }
    });

    child.on('error', (err) => {
      clearTimeout(timer);
      resolve({ stdout: '', stderr: err.message, exitCode: 1 });
    });
  });
}
