export function render(oldRender) {
  oldRender();
}

export const dva = {
  config: {
    onError(err) {
      err.preventDefault();
    },
  },
};
