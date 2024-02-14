export const getTime = (date: string) => {
  const hours24 = +date?.slice(11, 13) + 2;
  let hours: any = hours24 > 12 ? hours24 % 12 : hours24;
  hours < 10 ? (hours = '0' + hours) : null;
  return hours + ':' + date?.slice(14, 16) + (hours24 > 12 ? ' PM' : ' AM');
};

export const getId = () => Date.now() + Math.random().toString().split('.')[1];
