const Main = ({ style, children }) => {
  return (
    <main
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 3fr 1fr",
        columnGap: "2rem",
        padding: "1rem",
        ...style,
      }}
    >
      {children}
    </main>
  )
}

export default Main
