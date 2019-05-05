// 변수 선언
const popup = document.querySelector('.popup');
const projectLink = document.querySelectorAll('.project__link');
const project = document.querySelector('.project');
const toyProject = document.querySelector('.project-toy');
const studyProject = document.querySelector('.project-study');

// project, toy project, study project 리스트 필터
const projectList = projectObject.filter(projectObj => {
  return projectObj.category === "TOY PROJECT";
});
// const toyProjectList = projectObject.filter(projectObj => {
//   return projectObj.category === "TOY PROJECT";
// });
const studyProjectList = projectObject.filter(projectObj => {
  return projectObj.category === "STUDY";
});

// event
document.addEventListener('click', function (e) {
  // 팝업 닫기 이벤트
  if (e.target.className === "popup__close") {
    e.preventDefault();
    popup.classList.remove('on');
    document.body.style.overflow = "auto";
  }

  // 프로젝트 상세 설명 클릭했을때
  if (~e.target.className.indexOf("project__link")) {
    // id가 같은 프로젝트 선택
    const filteredProject = projectObject.filter(project => project.id === e.target.dataset.id)[0];
    const projectDescription = filteredProject.description.reduce((render, description) => {
      return render += `<li class="popup__group--item">- ${description}</li>`
    }, "")

    popup.innerHTML = `
    <div class="popup__content">
      <div class="popup__title">
        ${filteredProject.subTitle}
      </div>
      <div class="popup__group">
        <h4 class="popup__group--heading">
          Technology
        </h4>
        <p class="popup__group--list popup_technology">
          ${filteredProject.technology}
        </p>
      </div>
      <div class="popup__group">
        <h4 class="popup__group--heading">
          Concept
        </h4>
        <p class="popup__group--list popup_concept">
          ${filteredProject.concept}
        </p>
      </div>
      <div class="popup__group">
        <h4 class="popup__group--heading">
          Description
        </h4>
        <ul class="popup__group--list popup_description">
          ${projectDescription}
        </ul>
      </div>
      <a href="#" class="popup__close">&times;</a>
      <a href="${filteredProject.link}" target="_blank" class="popup__btn btn btn--animated btn--green btn--rect">사이트 바로 가기 &gt;</a>
    </div>`
    popup.classList.add('on');
    document.body.style.overflow = "hidden";
  }
})

// function 정의
// 프로젝트 리스트 렌더링 함수
const renderList = function(projectObject, renderProject) {
  const projectList = projectObject.map(projectObj => {
    return `<div class="project__item">
            <div class="project__card project__card-front">
              <div class="project__box">
                <!-- <i class="project__icon fa fa-github" aria-hidden="true"></i> -->
                <h3 class="heading-tertiary">${projectObj.title}</h3>
                <p class="project__paragraph">${projectObj.subTitle}</p>
              </div>
            </div>
            <div class="project__card project__card-back">
              <a data-id="${projectObj.id}" class="project__link btn btn--green btn--animated" href="#;">상세 설명</a>
            </div>
          </div>`
  }).join("");
  renderProject.innerHTML = projectList;
}

// function 실행
// 프로젝트 리스트 그리기
renderList(projectList, project);
// renderList(toyProjectList, toyProject);
renderList(studyProjectList, studyProject);
