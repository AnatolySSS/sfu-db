export const changeTheme = (updateTheme) => (value) => {
  updateTheme(value ? "dark" : "light");
  applyTheme(value);
};

export const applyTheme = (value) => {
  //Изменение темы для компонентов prime-react
  let themeLink = document.getElementById("app-theme");
  if (themeLink) {
    if (value == "dark") {
      themeLink.setAttribute("href", "/themes/mdc-dark-indigo/theme.css");
    } else {
      themeLink.setAttribute("href", "/themes/mdc-light-indigo/theme.css");
    }
  }
};
