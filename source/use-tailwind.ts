const useTailwind = () => {
  return (str: string) => ({
    $$css: true,
    [str]: str
  })
}

export default useTailwind
