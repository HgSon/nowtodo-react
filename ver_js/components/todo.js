import { getLocation } from "./location.js";
import { mainWeatherPresenter } from "./weather.js";

const todoContainer = document.getElementById("jsTodoContainer");
const newProjectForm = document.getElementById("newProjectForm");
const newProjectText = document.getElementById("newProjectText");
let projectList = [];
let creator = null;

//저장
const saveProjects = () => {
  const projects = JSON.stringify(projectList);
  localStorage.setItem("projectNames", projects);
};
function saveSublist(projectId, newTodo, checked = false) {
  let sublist = localStorage.getItem(projectId);
  sublist = sublist === null ? [] : JSON.parse(sublist);
  const newTodoObj = { content: newTodo, checked };
  sublist.push(newTodoObj);
  const sublistStr = JSON.stringify(sublist);
  localStorage.setItem(projectId, sublistStr);
}

//삭제
const deleteProject = (e) => {
  const container = e.currentTarget.parentNode.parentNode;
  const key = container.id;
  localStorage.removeItem(key);
  const projects = JSON.parse(localStorage.getItem("projectNames"));
  const updatedProjects = JSON.stringify(projects.filter((v) => !v[key]));
  localStorage.setItem("projectNames", updatedProjects);
  container.remove();
};
const deleteTodo = (e) => {
  const key = e.currentTarget.parentNode.parentNode.id;
  const target = e.currentTarget.nextSibling.nextSibling;
  const project = JSON.parse(localStorage.getItem(key));
  const modifiedProject = JSON.stringify(
    project.filter((v) => v["content"] !== target.innerHTML)
  );
  localStorage.setItem(key, modifiedProject);
  e.currentTarget.nextSibling.remove();
  e.currentTarget.remove();
  target.remove();
};

//저장된목록 보이기
const showList = (creator, project = "projectNames") => {
  const getList = localStorage.getItem(project);
  if (getList == null) return;
  if (project !== "projectNames") {
    const subList = JSON.parse(getList);
    return subList.forEach((todo) =>
      paintSublist(project, todo.content, todo.checked)
    );
  } else {
    projectList = JSON.parse(getList);
    projectList.forEach((project) => {
      const id = Object.keys(project);
      const { content, checked, creator: creatorID } = Object.values(
        project
      )[0];
      if (creatorID === creator) {
        paintProject(content, id, checked);
        return showList(creator, id);
      }
    });
  }
};

//추가
const addList = (event) => {
  event.preventDefault();
  const input = event.currentTarget.firstElementChild;
  const content = input.value;
  input.value = "";
  if (input === newProjectText) {
    const id = Date.now();
    const checked = false;
    let newProjectObj = {};
    newProjectObj[id] = { content, checked, creator };
    projectList.push(newProjectObj);
    saveProjects();
    paintProject(content, id);
  } else {
    const subListContainer = event.currentTarget.parentNode;
    const projectId = subListContainer.id;
    saveSublist(projectId, content);
    paintSublist(projectId, content);
  }
};

//추가목록 보이기
const paintProject = (project, projectId, checked = false) => {
  const div = document.createElement("div");
  const dl = document.createElement("dl");
  const dt = document.createElement("dt");
  const form = document.createElement("form");
  const input = document.createElement("input");
  const deleteBtn = document.createElement("button");
  deleteBtn.innerHTML = '<i class="far fa-trash-alt"></i>';
  deleteBtn.classList.add("delete-project");
  const completeBtn = document.createElement("button");
  completeBtn.innerHTML = '<i class="fas fa-check"></i>';
  completeBtn.classList.add("complete-project");
  input.type = "text";
  input.placeholder = "새 할일";
  todoContainer.append(div);
  div.prepend(dl);
  dl.append(dt);
  dl.prepend(completeBtn);
  dl.prepend(deleteBtn);
  div.append(form);
  form.append(input);
  dt.innerHTML = project;
  div.id = projectId;
  form.addEventListener("submit", addList);
  deleteBtn.addEventListener("click", deleteProject);
  if (checked) {
    completeBtn.style.color = "red";
    dt.style.color = "rgba(255,255,255,0.4)";
  }
  completeBtn.addEventListener("click", handleComplete);
};
const changeContent = (e) => {
  e.preventDefault();
  const form = e.currentTarget;
  const input = form.firstElementChild;
  const todo = input.value;
  const projectId = form.parentNode.parentNode.id;
  const dd = form.previousSibling;
  const todoList = JSON.parse(localStorage.getItem(projectId));
  const newList = todoList.map((v) => {
    if (v["content"] === dd.innerHTML) {
      v["content"] = todo;
    }
    return v;
  });
  localStorage.setItem(projectId, JSON.stringify(newList));
  dd.innerHTML = todo;
  form.remove();
};
const handleModify = (e) => {
  const target = e.currentTarget;
  const form = document.createElement("form");
  const input = document.createElement("input");
  input.value = target.innerHTML;
  target.after(form);
  form.append(input);
  input.classList.add("modify-sublist");
  form.addEventListener("submit", changeContent);
};
function paintSublist(projectId, todo, checked = false) {
  const parent = document.getElementById(projectId);
  const dl = parent.querySelector("dl");
  const dd = document.createElement("dd");
  const deleteBtn = document.createElement("button");
  const completeBtn = document.createElement("button");
  deleteBtn.innerHTML = '<i class="fas fa-minus"></i>';
  completeBtn.classList.add("complete-todo");
  deleteBtn.classList.add("delete-todo");
  dl.append(dd);
  dd.before(deleteBtn);
  dd.before(completeBtn);
  dd.innerHTML = todo;
  deleteBtn.addEventListener("click", deleteTodo);
  if (checked) {
    completeBtn.insertAdjacentHTML("beforeend", '<i class="fas fa-check"></i>');
    dd.style.color = "rgba(255,255,255,0.4)";
  }
  dd.addEventListener("click", handleModify);
  completeBtn.addEventListener("click", handleComplete);
}

//완료표시
const handleComplete = (e) => {
  const target = e.currentTarget;
  const id = target.parentNode.parentNode.id;
  const text = target.nextSibling;
  const isProject = text.tagName === "DT";
  const key = isProject ? "projectNames" : id;
  const list = JSON.parse(localStorage.getItem(key));
  const index = list.findIndex((v) =>
    isProject ? Object.keys(v)[0] === id : v.content === text.innerHTML
  );
  const isChecked = isProject
    ? list[index][id]["checked"]
    : list[index]["checked"];
  if (isProject) {
    if (!isChecked) {
      target.style.color = "red";
      text.style.color = "rgba(255,255,255,0.4)";
    } else {
      target.style.color = "white";
      text.style.color = "white";
    }
    list[index][id]["checked"] = !isChecked;
  } else {
    if (!isChecked) {
      target.insertAdjacentHTML("beforeend", '<i class="fas fa-check"></i>');
      text.style.color = "rgba(255,255,255,0.4)";
    } else {
      target.firstChild.remove();
      text.style.color = "white";
    }
    list[index]["checked"] = !isChecked;
  }
  localStorage.setItem(key, JSON.stringify(list));
};

export default (nowLogin = false) => {
  creator = nowLogin;
  // mainWrap.style.display = "none";
  todoWrap.style.display = "grid";
  getLocation(true);
  showList(creator);
  newProjectForm.addEventListener("submit", addList);
};
