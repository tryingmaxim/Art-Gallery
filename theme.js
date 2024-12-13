class ThemeManager {
    constructor() {
      this.checkbox = document.getElementById('theme-toggle');
      this.init();
    }
  
    init() {
    
      const savedTheme = localStorage.getItem('theme');
      if (savedTheme === 'light') {
        document.body.classList.add('light-mode');
        this.checkbox.checked = true;
      }
  
 
      this.checkbox.addEventListener('change', () => {
        document.body.classList.toggle('light-mode');
        localStorage.setItem('theme', 
          document.body.classList.contains('light-mode') ? 'light' : 'dark'
        );
      });
    }
  }
  
  new ThemeManager();