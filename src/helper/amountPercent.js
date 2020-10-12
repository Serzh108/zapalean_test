export default function amountPercent(arr) {
  let sum = arr.reduce((acc, el) => acc + Number(el.amount), 0);
  sum = sum === 0 ? 1 : sum;
  const arrPercent = [...arr];
  arr.reduce((acc, item, idx) => {
    acc =
      idx === 0 ? Number(item.amount) / sum : Number(item.amount) / sum + acc;
    arrPercent[idx] = { ...arrPercent[idx], amount: acc };
    return acc;
  }, 0);
  return arrPercent;
}
