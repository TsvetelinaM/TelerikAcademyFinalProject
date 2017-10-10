const entityMap = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
    '/': '&#x2F;',
    '`': '&#x60;',
    '=': '&#x3D;',
  };

  function escapeHtml(string) {
    return String(string).replace(/[&<>"'`=\/]/g, (s) => {
      return entityMap[s];
    });
  };

  function getCurrentDate() {
    const currentDate = new Date();
    let day = currentDate.getDate();
    if ( day < 10 ) {
        day = '0' + day;
    }
    let month = currentDate.getMonth() + 1;
    if ( month < 10 ) {
        month = '0' + month;
    }
    const year = currentDate.getFullYear();
    const stringDate = day+'-'+month+'-'+year;
    return stringDate;
  };
  export { escapeHtml, getCurrentDate };