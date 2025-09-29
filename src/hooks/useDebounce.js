function useDebounce(cb, delay = 2000) {
  let timerId;

  return (...args) => {
    console.log(...args);

    clearInterval(timerId);
    timerId = setTimeout(() => {
      cb(...args);
    }, delay);
  };
}
export default useDebounce;
