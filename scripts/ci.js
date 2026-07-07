// eslint-disable-next-line
import { ci } from '../src/scripts/ci';

export default async function ci() {
  const { build, test } = await ci();
  console.log(build);
  console.log(test);
}