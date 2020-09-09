export default {
  parseArrayIntoPairs(arr) {
    return arr.reduce(function(result, value, index, array) {
      if (index % 2 === 0)
        result.push(array.slice(index, index + 2));
      return result;
    }, []);
  },

  formatArrayToAttachmentsObject(arr) {
    return arr.map((value) => {
      return { filename: value[0], path: value[1] }
    });
  } 
}