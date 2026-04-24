# Deploy workflow

`deploy.yml` runs on push to `main` and deploys to the production host via SSH + pm2.

## One-time setup in GitHub

Add these repository secrets at **Settings → Secrets and variables → Actions**:

| Secret | Value |
|---|---|
| `DEPLOY_HOST` | `73.74.77.154` |
| `DEPLOY_USER` | `root` (or a dedicated deploy user with sudo-less access to `/var/www/SeniorBrainGames` + `pm2 restart seniorbraingames`) |
| `DEPLOY_SSH_KEY` | Private SSH key (PEM, no passphrase) whose public half is in the host's `~/.ssh/authorized_keys` |
| `DEPLOY_PORT` | `22` (omit if standard) |

## How it behaves

1. **`verify` job** — checks out, runs `npm ci`, `npm run lint`, `npm run build` on a clean ubuntu-latest runner. If anything fails, deploy never starts.
2. **`deploy` job** — SSHs into the host, stashes any local `ecosystem.config.cjs` edits, pulls `origin main`, re-applies the host-specific path/port overrides (cwd `/var/www/SeniorBrainGames`, port 3100, host 127.0.0.1), reinstalls deps, rebuilds, restarts pm2, and hits the health endpoint.
3. **Concurrency gate** — only one deploy runs at a time; subsequent pushes queue rather than racing.

## To deploy manually

GitHub → **Actions** tab → **Deploy to production** → **Run workflow** → pick branch → **Run**. Uses the `workflow_dispatch` trigger.

## If a deploy fails mid-way

- **Build failed on runner**: fix locally and push. Production is unchanged.
- **SSH step failed after pull but before restart**: old build still running; run the workflow again or manually `npm run build && pm2 restart seniorbraingames` on the host.
- **Health check failed**: `pm2 logs seniorbraingames --nostream --lines 80` on the host to diagnose. Revert with `git reset --hard <previous-commit>` + rebuild if needed.
