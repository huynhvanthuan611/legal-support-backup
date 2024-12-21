import { axiosInstance } from "configs/api/api";
import { call, put, select } from "redux-saga/effects";
import { responseQuestion, Result, ViewFactory } from "../quesitionType";
import {
  questionChangeView,
  QuestionFetchResult,
  questionFetchResultSuccess,
} from "../questionActions";
import { historyLocalAdd } from "contexts/history";

export function* handleFetchQuestionSaga(action: QuestionFetchResult) {
  try {
    const { description, specificSituation } = action.payload;

    // Get form data from the state
    const form = yield select((state) => state.question.form.formData);

    const payload = {
      description: description,
      specificSituation: specificSituation,
    };

    // Axios request
    // const axiosResponse = yield call(
    //   axiosInstance.post,
    //   "/get_answer",
    //   payload
    // );

    // const axiosRequest: responseQuestion = axiosResponse;

    const axiosRequest: responseQuestion = {
      question:
        "Mẹ tôi và dượng tôi ở với nhau gần 10 năm nhưng không đăng ký kết hôn Nay dượng tôi phản bội mẹ tôi, có vợ mới và muốn chia đôi số tài sản, trong đó tiền vốn là của tôi bỏ ra cho mẹ tôi làm ăn. Ông ta đòi làm đơn kiện nếu mẹ tôi không đồng ý chia đôi số tài sản hiện tại. Trường hợp này phải giải quyết như thế nào? (Số tiền tôi đưa mẹ làm ăn không có giấy tờ gì chứng minh cả)",
      answer:
        "Căn cứ Điều 59 Luật Hôn nhân và gia đình năm 2014 quy định: - Vợ, chồng hoặc cả hai người có quyền yêu cầu Tòa án giải quyết ly hôn. - Cha, mẹ, người thân thích khác có quyền yêu cầu Tòa án giải quyết ly hôn khi một bên vợ, chồng do bị bệnh tâm thần hoặc mắc bệnh khác mà không thể nhận thức, làm chủ được hành vi của mình, đồng thời là nạn nhân của bạo lực gia đình do chồng, vợ của họ gây ra làm ảnh hưởng nghiêm trọng đến tính mạng, sức khỏe, tinh thần của họ. - Chồng không có quyền yêu cầu ly hôn trong trường hợp vợ đang có thai, sinh con hoặc đang nuôi con dưới 12 tháng tuổi. - Trong trường hợp vợ đang có thai, sinh con hoặc đang nuôi con dưới 12 tháng tuổi thì chồng không có quyền yêu cầu ly hôn. - Trong trường hợp chồng đang có thai, sinh con hoặc đang nuôi con dưới 12 tháng tuổi thì",
    };

    // Construct the Result object
    const result: Result = {
      fullName: form.fullName,
      caseType: form.caseType,
      phone: form.phone,
      gender: form.gender,
      question: axiosRequest.question,
      answer: axiosRequest.answer,
    };

    yield put(historyLocalAdd(result));

    yield put(questionFetchResultSuccess(result));
    yield put(questionChangeView(ViewFactory.result));
  } catch (error) {
    console.error(error);
  }
}
