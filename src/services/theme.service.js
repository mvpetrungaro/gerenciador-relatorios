const themes = {
  light: {
    label: 'light',
    href: '/themes/bootstrap4-light-blue.css',
    icon: 'moon',
    customStyles: `
        .text-danger {
          color: #dc3545 !important
        }
  
        .text-danger:hover {
          color: #c82333 !important
        }
      `,
  },
  dark: {
    label: 'dark',
    href: '/themes/bootstrap4-dark-blue.css',
    icon: 'sun',
    customStyles: `
        .text-danger {
          color: #f19ea6 !important
        }
  
        .text-danger:hover {
          color: #e97984 !important
        }
      `,
  },
}

export function getInitialTheme() {
  let selectedTheme = localStorage.getItem('selectedTheme')

  if (!selectedTheme) {
    selectedTheme = themes.light.label
    localStorage.setItem('selectedTheme', selectedTheme)
  }

  return themes[selectedTheme]
}

export function toggleTheme(currentTheme) {
  let nextTheme

  if (currentTheme.label === themes.light.label) {
    nextTheme = themes.dark
  } else {
    nextTheme = themes.light
  }

  localStorage.setItem('selectedTheme', nextTheme.label)

  return nextTheme
}
