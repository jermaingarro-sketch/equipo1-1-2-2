// import React, { useContext, useState } from 'react';

// // Creamos el contexto
// const ThemeContext = React.createContext();

// const ThemeProvider = ({ children }) => {
//   const [theme, setTheme] = useState('light');
  
//   const toggleTheme = () => {
//     setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
//   };

//   return (
//     <ThemeContext.Provider value={{ theme, toggleTheme }}>
//       {children}
//     </ThemeContext.Provider>
//   );
// };

// const ThemedComponent = () => {
//   const { theme, toggleTheme } = useContext(ThemeContext);
//   return (
//     <div style={{ background: theme === 'light' ? '#fff' : '#333', color: theme === 'light' ? '#000' : '#fff' }}>
//       <p>Current theme: {theme}</p>
//       <button onClick={toggleTheme}>Toggle Theme</button>
//     </div>
//   );
// };

// const App = () => (
//   <ThemeProvider>
//     <ThemedComponent />
//   </ThemeProvider>
// );

// export default App;