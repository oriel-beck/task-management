import { ToTaskStatusPipe } from './to-task-status.pipe';

describe('ToTaskStatusPipe', () => {
  it('create an instance', () => {
    const pipe = new ToTaskStatusPipe();
    expect(pipe).toBeTruthy();
  });
});
