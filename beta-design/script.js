function showContent(tabName) {
  const contentTabs = document.querySelectorAll('.tabContent');
  contentTabs.forEach(tab => {
      tab.style.display = 'none';
  });

  document.getElementById(tabName + 'Content').style.display = 'block';
}

// Show the 'About' content by default
showContent('about');
