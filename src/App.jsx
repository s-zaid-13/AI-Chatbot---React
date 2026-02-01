import { use, useState } from "react";
import styles from "./App.module.css";
import { Chat } from "./components/Chat/Chat";
import { Controls } from "./components/Controls/Controls";
import { Assistant } from "./components/assistants/googleai";
// import { Assistant } from "./components/assistants/openai";
// import { Assistant } from "./components/assistants/deepseekai";
import { Loader } from "./components/Loader/Loader";


function App() {
  const assistant = new Assistant();
  document.body.classList.add('light');
  const [messages, setMessages] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [isStreaming, setStreaming] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  function addMessage(message) {
    setMessages((prevMessages) => [...prevMessages, message])
  }
  function updateLastMessageContent(content) {
    setMessages((prevMessages) => prevMessages.map((message, index) => index === prevMessages.length - 1 ? { ...message, content: `${message.content}${content}` } : message));
  }

  async function handleContentSend(content) {
    addMessage({ content, role: 'user' });
    setLoading(true);
    try {
      const result = await assistant.chatStream(content, messages);
      let isFirstChunk = false;
      for await (const chunk of result) {
        if (!isFirstChunk) {
          isFirstChunk = true;
          setLoading(false);
          setStreaming(true);
          addMessage({ content: "", role: "assistant" });
        }
        updateLastMessageContent(chunk);
      }
      setStreaming(false);
      // const result = await assistant.chat(content, messages);
      // addMessage({ content: result, role: "assistant" })
    } catch (error) {
      addMessage({ content: "Sorry, I can't process your query right now!Try Again later", role: "system" })
    }
    setLoading(false);
    setStreaming(false);
  }
  const toggleTheme = () => {
    setLoading(true); // Start loading

    setTimeout(() => {
      setIsDarkMode(!isDarkMode);

      if (!isDarkMode) {

        document.body.classList.add("dark");
        document.body.classList.remove("light");
        document.body.style.setProperty("color-scheme", "dark");
      } else {

        document.body.classList.add("light");
        document.body.classList.remove("dark");
        document.body.style.setProperty("color-scheme", "light");
      }

      setLoading(false);
    }, 300);
  };

  return (
    <div className={styles.App}>
      {isLoading && <Loader />
      }
      <header className={styles.Header}>
        <img className={styles.Logo} src="robot.png" />
        <h2 className={styles.Title}>AI Chatbot</h2>
        <button onClick={toggleTheme} className={styles.ThemeButton}>
          {isDarkMode ? '🌞' : '🌙'}
        </button>
      </header>
      <div className={styles.ChatContainer}>
        <Chat messages={messages} />
      </div>
      <Controls isDisabled={isLoading || isStreaming} onSend={handleContentSend} />
    </div>
  );
}


export default App;
