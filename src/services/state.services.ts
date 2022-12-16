import { reactive } from "vue";

const drawBoardState = {
    color: 'rgba(255,19,19,1)',
    fontSize: 16,
    fontWeight: 2,
    fontFamily: '宋体',
};
const DrawBoardState = reactive(drawBoardState);
export {
    DrawBoardState
}
