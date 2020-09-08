import React from 'react';

// common styling
export const classesBoxBorder = "sm:border sm:rounded sm:border-gray-400 sm:bg-white";

// SVG icons
export const downloadIcon = (<svg className="inline fill-current w-4 h-4 ml-1 mb-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z" /></svg>);
export const externalLinkIcon = (<svg className="inline fill-current w-4 h-4 ml-1 mb-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M19,21H5c-1.1,0-2-0.9-2-2V5c0-1.1,0.9-2,2-2h7v2H5v14h14v-7h2v7C21,20.1,20.1,21,19,21z" /><path d="M21 10L19 10 19 5 14 5 14 3 21 3z" /><path d="M6.7 8.5H22.3V10.5H6.7z" transform="rotate(-45.001 14.5 9.5)" /></svg>);
export const searchIcon = (<svg className="fill-current h-6 w-6 mr-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" ><path d="M9,2 C5.146,2 2,5.146 2,9 C2,12.854 5.146,16 9,16 C10.748,16 12.345,15.348 13.574,14.281 L14,14.707 L14,16 L19.586,21.586 C20.138,22.138 21.034,22.138 21.586,21.586 C22.138,21.034 22.138,20.138 21.586,19.586 L16,14 L14.707,14 L14.281,13.574 C15.348,12.345 16,10.748 16,9 C16,5.146 12.854,2 9,2 z M9,4 C11.773,4 14,6.227 14,9 C14,11.773 11.773,14 9,14 C6.227,14 4,11.773 4,9 C4,6.227 6.227,4 9,4 z" /></svg>);
export const helpIcon = (<svg className="inline fill-current w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g id="help"><path id="circle" d="M12.001 2.085c-5.478 0-9.916 4.438-9.916 9.916 0 5.476 4.438 9.914 9.916 9.914 5.476 0 9.914-4.438 9.914-9.914 0-5.478-4.438-9.916-9.914-9.916zm.001 18c-4.465 0-8.084-3.619-8.084-8.083 0-4.465 3.619-8.084 8.084-8.084 4.464 0 8.083 3.619 8.083 8.084 0 4.464-3.619 8.083-8.083 8.083z"/><g id="question-mark"><path id="top" d="M11.766 6.688c-2.5 0-3.219 2.188-3.219 2.188l1.411.854s.298-.791.901-1.229c.516-.375 1.625-.625 2.219.125.701.885-.17 1.587-1.078 2.719-.953 1.186-1 3.655-1 3.655h1.969s.135-2.318 1.041-3.381c.603-.707 1.443-1.338 1.443-2.494s-1.187-2.437-3.687-2.437z"/><path id="bottom" d="M11 16h2v2h-2z"/></g></g></svg>);
export const githubIcon = (<svg className="inline fill-current w-4 h-4 mb-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M11.999,0.806 C5.662,0.806 0.523,5.945 0.523,12.284 C0.523,17.354 3.811,21.656 8.372,23.173 C8.946,23.279 9.155,22.925 9.155,22.62 C9.155,22.348 9.145,21.626 9.14,20.669 C5.947,21.362 5.274,19.13 5.274,19.13 C4.752,17.804 3.999,17.451 3.999,17.451 C2.957,16.739 4.078,16.753 4.078,16.753 C5.23,16.834 5.836,17.936 5.836,17.936 C6.86,19.69 8.523,19.183 9.176,18.89 C9.281,18.148 9.577,17.643 9.905,17.356 C7.357,17.066 4.677,16.081 4.677,11.683 C4.677,10.431 5.125,9.405 5.859,8.604 C5.74,8.313 5.346,7.146 5.971,5.566 C5.971,5.566 6.935,5.258 9.127,6.743 C10.042,6.488 11.025,6.361 12,6.356 C12.975,6.361 13.957,6.488 14.874,6.743 C17.065,5.258 18.026,5.566 18.026,5.566 C18.653,7.146 18.259,8.313 18.141,8.604 C18.877,9.405 19.321,10.431 19.321,11.683 C19.321,16.093 16.637,17.063 14.081,17.347 C14.492,17.701 14.859,18.401 14.859,19.472 C14.859,21.006 14.845,22.244 14.845,22.62 C14.845,22.927 15.053,23.285 15.634,23.173 C20.192,21.652 23.477,17.353 23.477,12.284 C23.477,5.945 18.338,0.806 11.999,0.806" fill="#161514"/></svg>);

// components
export const ExternalLink = (props) => {return (<a {...props} target="_blank" rel="noopener noreferrer">{props.children}</a>)}
