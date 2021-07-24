const Main = ({ style, children }) => {
  return (
    <main
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 2fr",
        columnGap: "1rem",
        marginTop: "1rem",
        ...style,
      }}
    >
      {children}
    </main>
  )
}

export default Main
