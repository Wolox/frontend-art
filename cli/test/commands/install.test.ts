import { expect, test } from '@oclif/test';

describe('install', () => {
  test
    .stdout()
    .stderr()
    .command(['install', 'react', 'buttons', 'button-1', "-d='example'"])
    .it('runs install and shows the tech, category and recipe', (ctx) => {
      expect(ctx.stderr).to.contain('react');
      expect(ctx.stderr).to.contain('buttons');
      expect(ctx.stderr).to.contain('button-1');
    });
});
