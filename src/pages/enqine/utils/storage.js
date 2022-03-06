export function storageSetItem(key, item) {
  localStorage.setItem(key, JSON.stringify(item));
}

export function getStorage() {
  const data = localStorage.getItem('reboot');
  if (data) {
    return JSON.parse(data);
  } else {
    storageSetItem('reboot', {})
    return {};
  }
}

export function storageSetUser(user) {
  const data = getStorage();
  storageSetItem('reboot', {...data, [user]: {startTime: null, endTime: null, actualQuestion: null}})
}

export function storageSetStart(user, startTime) {
  const data = getStorage();
  storageSetItem('reboot', {...data, [user]: {...data[user], startTime}})
}

export function storageSetEnd(user, endTime) {
  const data = getStorage();
  storageSetItem('reboot', {...data, [user]: {...data[user], endTime}})
}

export function storageAddActualQuestion(user, question) {
  const data = getStorage();
  storageSetItem('reboot', {...data, [user]: {...data[user], actualQuestion: question} })
}
