import { spawnSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const siteRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

const cases = [
	{
		name: 'posts',
		fixture: path.join(siteRoot, 'scripts/fixtures/invalid-post.md'),
		testDir: path.join(siteRoot, 'src/content/posts/_schema-test'),
	},
	{
		name: 'projects',
		fixture: path.join(siteRoot, 'scripts/fixtures/invalid-project.md'),
		testDir: path.join(siteRoot, 'src/content/projects/_schema-test'),
	},
];

function run(cmd, args) {
	return spawnSync(cmd, args, { cwd: siteRoot, encoding: 'utf8', shell: false });
}

function assertCheckFails(collectionName, fixtureSrc, testDir) {
	const testFile = path.join(testDir, 'invalid.md');
	fs.mkdirSync(testDir, { recursive: true });
	fs.copyFileSync(fixtureSrc, testFile);

	try {
		const check = run('npm', ['run', 'check']);
		if (check.status === 0) {
			console.error(
				`Expected npm run check to fail on invalid ${collectionName} frontmatter, but it passed.`,
			);
			process.exit(1);
		}

		const output = `${check.stdout ?? ''}${check.stderr ?? ''}`;
		if (!/path|schema|invalid|required|error/i.test(output)) {
			console.error(
				`check failed for ${collectionName} as expected, but output lacked a clear validation message:\n`,
				output,
			);
			process.exit(1);
		}

		console.log(`Schema validation gate OK (${collectionName}): invalid frontmatter rejected.`);
	} finally {
		fs.rmSync(testDir, { recursive: true, force: true });
	}
}

for (const { name, fixture, testDir } of cases) {
	assertCheckFails(name, fixture, testDir);
}
