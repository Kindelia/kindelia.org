export function storageSetItem(key, item) {
  localStorage.setItem(key, JSON.stringify(item));
}

export function getStorage() {
  const data = localStorage.getItem("result");
  if (data) {
    return JSON.parse(data);
  } else {
    storageSetItem("result", {});
    return {};
  }
}

export function getResult(user) {
  const data = getStorage();
  return data[user];
}

export function addResult(user, result) {
  const data = getStorage();
  if (data[user]) {
    storageSetItem("result", {
      ...data,
      [user]: [...data[user], result],
    });
  } else {
    storageSetItem("result", {
      [user]: [result],
    });
  }
}
