export const mapRange = ({ from, to, target, isClamped = true }) => {
  const [inputStart, inputEnd] = from;
  const [outputStart, outputEnd] = to;

  let clampedTarget = target;
  if (isClamped) {
    if (target < inputStart) {
      clampedTarget = inputStart;
    } else if (target > inputEnd) {
      clampedTarget = inputEnd;
    }
  }

  const output =
    outputStart +
    ((outputEnd - outputStart) / (inputEnd - inputStart)) *
      (clampedTarget - inputStart);

  return output;
};
