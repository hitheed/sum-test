function debounce(callback: ReturnType<typeof Function>, delay: number) {
  let timeout: ReturnType<typeof setTimeout>;

  return function(...args: any) {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const context = this;

    if (timeout) clearTimeout(timeout);

    timeout = setTimeout(() => callback.apply(context, args)
    , delay);
  };
}

export default debounce;
