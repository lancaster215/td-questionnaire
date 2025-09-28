import { QuestionProvider } from "@/hooks/useQuestionContext";
import { store } from "@/store/store";
import "@/styles/globals.css";
import { Provider } from "react-redux";

export default function App({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <QuestionProvider>
        <Component {...pageProps} />
      </QuestionProvider>
    </Provider>
  )
}
