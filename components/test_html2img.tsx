import React from 'react';
import html2canvas from 'html2canvas';

const html_string = `<div id="capture" style="padding: 10px; background: #f5da55"><h4 style="color: #000; ">Hello world!</h4></div>`

html2canvas(html_string).then(canvas => {
    document.body.appendChild(canvas)
});


return (

)