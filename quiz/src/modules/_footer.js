import githubImage from '../assets/images/github.png';
import rsschoolImage from '../assets/images/rs-school.svg';

function createFooter() {
  const footer = document.createElement('footer');
  footer.className = 'footer';

  const rsLink = document.createElement('a');
  rsLink.href = 'https://rs.school/js/';
  rsLink.target = '_blank';
  const rsschool = new Image();
  rsschool.src = rsschoolImage;
  rsschool.className = 'footer__rs-school';
  rsLink.append(rsschool);
  footer.append(rsLink);

  const span = document.createElement('span');
  span.innerHTML = 'Valentin Berezhnykh, 2022';
  footer.append(span);

  const githubLink = document.createElement('a');
  githubLink.href = 'https://github.com/vberezhnykh';
  githubLink.target = '_blank';
  const github = new Image();
  github.className = 'footer__github';
  github.src = githubImage;
  githubLink.append(github);
  footer.append(githubLink);

  return footer;
}

export default createFooter;
