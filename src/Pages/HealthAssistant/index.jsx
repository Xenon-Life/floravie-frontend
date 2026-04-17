import { useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import { BsFillSendFill } from "react-icons/bs";
import userIcon from "../../assets/userIcon.png";
import botIcon from "../../assets/botIcon.png";
import chatBotLogo from "../../assets/chatBotLogo.svg";
import ChatBotApi from "./ChatBotApi";
import { ButtonLoader } from "../../Components/Loaders";

function HealthAssistant() {
  const textareaRef = useRef(null);
  const [inputValue, setInputValue] = useState("");
  const [message, setMessage] = useState([]);
  const [isQuery, setIsQuery] = useState(false);
  const [disableInput, setDisableInput] = useState(false);
  const [response, setResponse] = useState("");
  // const [loading, setLoading] = useState(false);
  console.log(response);

  const handleQuery = async (query) => {
    const trimmedQuery = (query || "").trim();
    if (!trimmedQuery || disableInput) {
      return;
    }

    setInputValue("");
    setDisableInput(true);
    // setLoading(true);
    setIsQuery(true);
    const userMessage = { role: "user", content: trimmedQuery };
    setMessage((prevMessages) => [...prevMessages, userMessage]);

    const loadingMessage = { role: "assistant", content: "", loading: true };
    setMessage((prevMessages) => [...prevMessages, loadingMessage]);

    const result = await ChatBotApi(trimmedQuery);
    const responseData = result?.data;
    setResponse(responseData || result);
    console.log("RESULT from chatbot", result?.text || result);

    const fallbackMessage =
      result?.message ||
      "I could not fetch a response right now. Check Gemini API configuration and try again.";

    const assistantContent =
      result?.ok && typeof result?.text === "string" && result.text.length > 0
        ? result.text
        : fallbackMessage;

    setMessage((prevMessages) => {
      const updatedMessages = [...prevMessages];
      updatedMessages[updatedMessages.length - 1] = {
        role: "assistant",
        content: assistantContent,
        loading: false,
      };
      return updatedMessages;
    });

    // setMessage((prevMessages) => [...prevMessages, chatResponse]);
    setDisableInput(false);
    // setLoading(false);
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
    }
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  };

  return (
    <>
      <div className="w-11/12 m-auto md:w-full flex flex-col justify-between h-[90%]">
        <div className="min-h-[80%] no-scrollbar overflow-y-auto">
          <div className="flex items-center justify-center mb-4 md:mb-2">
            <div className="footer-bg w-12 rounded-full">
              <img
                src={chatBotLogo}
                alt="Chat Bot Logo"
                className="py-2.5 px-3 w-full object-cover"
              />
            </div>
          </div>
          <h6 className="text-center font-bold text-2xl md:text-lg mb-4 md:mb-2">
            Ask me something
          </h6>
          <p className="text-center mb-4">
            Hello, I am here to assist you in figuring out your problems and
            offer immediate support.
          </p>

          {!isQuery ? (
            <div className="w-7/12 m-auto flex flex-wrap gap-4 justify-center items-center mb-4 md:w-11/12 md:gap-1.5">


              <button
                className="gray-color rounded-xl min-h-18 max w-[47%] md:w-full flex flex-col max-h-20 px-4 py-4 mb-4 md:mb-2 md:px-3 md:py-1.5 md:text-xs shadow-slate-200 shadow-md"
                onClick={() =>
                  handleQuery("common PMS and Menstruation problems")
                }
              >
                <p className="font-semibold">PMS and menstruation problem?</p>
                <p>Let’s find a solution.</p>
              </button>

              <button
                className="gray-color rounded-xl min-h-18 max w-[47%] md:w-full flex flex-col max-h-20 px-4 py-4 mb-4 md:mb-2 md:px-3 md:py-1.5 md:text-xs shadow-slate-200 shadow-md"
                onClick={() =>
                  handleQuery("common pregnancy related solutions")
                }
              >
                <p className="font-semibold">
                  Got pregnancy related questions?
                </p>
                <p>Let’s find a solution.</p>
              </button>


              <button
                className="gray-color rounded-xl mb-4 min-h-18 max w-[47%] md:w-full flex flex-col max-h-20 px-4 py-4 md:mb-2  md:px-3 md:py-3 md:text-xs shadow-slate-200 shadow-md"
                onClick={() => handleQuery("Breast cancer early symptoms?")}
              >
                <p className="font-semibold">Breast cancer early symptoms?</p>
                <p>Let’s find a solution.</p>
              </button>


              <button
                className="gray-color rounded-xl mb-4 min-h-18 max w-[47%] md:w-full flex flex-col max-h-20 px-4 py-4 md:mb-2 md:px-3 md:py-3 md:text-xs shadow-slate-200 shadow-md"
                onClick={() => handleQuery("Common skin care tips")}
              >
                <p className="font-semibold">Need skincare tips?</p>
                <p>Let’s find a solution.</p>
              </button>
            </div>
          ) : (
            <div>
              {message?.map((msg, index) => (
                <div
                  key={index}
                  className="rounded-xl w-11/12 m-auto flex flex-col flex-wrap px-4 md:px-2 md:py-1 md:text-xs mb-4 md:mb-2"
                >
                  {msg?.role === "user" && (
                    <div className="flex flex-col items-start flex-wrap px-4 mb-1 gap-1">
                      <div className="flex items-center gap-3 w-full">
                        <img src={userIcon} width={32} alt="User Icon" />
                        <p className="flex flex-wrap w-full shadow-md shadow-slate-200 rounded-[10.5px] py-3.5 px-2.5 md:py-2 md:px-1.5 md:text-sm">
                          {msg.content}
                        </p>
                      </div>
                    </div>
                  )}
                  {msg?.role === "assistant" && (
                    <div className="flex items-start px-4 gap-3">
                      <div className="footer-bg primary-color rounded-full min-w-8 min-h-8 flex items-center justify-center">
                        <img
                          src={botIcon}
                          width={14}
                          className="object-cover"
                          alt="Bot Icon"
                        />
                      </div>
                      <div className="flex flex-wrap w-full shadow-md shadow-slate-200 rounded-[10.5px] py-3.5 px-2.5 md:py-2 md:px-1.5 md:text-sm">
                        {msg.loading ? (
                          <ButtonLoader />
                        ) : (
                          typeof msg?.content === "string" && (
                            <ReactMarkdown>{msg.content}</ReactMarkdown>
                          )
                        )}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="w-11/12 md:w-full mx-auto flex items-center">
          <textarea
            ref={textareaRef}
            rows={1}
            placeholder="Ask Me Your Medical Query"
            className="prompt-field w-full pl-5 pr-20 py-3 outline-none resize-none overflow-hidden"
            onChange={handleInputChange}
            value={inputValue}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleQuery(inputValue);
              }
            }}
            disabled={disableInput}
          />

          <BsFillSendFill
            className="-ml-10 hover:cursor-pointer hover:animate-pulse primary-color"
            onClick={() => {
              if (!disableInput) {
                handleQuery(inputValue);
              }
            }}
          />
        </div>
      </div>
    </>
  );
}

export default HealthAssistant;
