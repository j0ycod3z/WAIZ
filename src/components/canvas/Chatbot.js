import React, { useState } from "react";
import { CHATBOT } from "settings/Config"; // Ensure that the path is correct
import cx from "classnames";

import c from "resources/css/canvas/Chatbot.module.css"; // Adjust the path as necessary

function Chatbot() {
  const [isOpen, setIsOpen] = useState(true);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [conversation, setConversation] = useState([
    {
      role: "user",
      content: "Your name is KAHU. You are trained based on the Ebelli book made by Pedro LÓPEZ SELA. You will help and assist the user in his or her task for completing the systemic canvas for startup building process. As well as serve as a guide in completing the systemic canvas by answering their questions. Ask them one question at a time and explain the question. After answering all the questions related to that box provide the final output sugGestion for that box. In addition, make sure that before you move on to a different box in a systemic canvas, ask if the user still needs more help with that box. Lastly, before moving to that box, provide what was the final output should be for that box base on your discussions. Here are the 9 boxes for the systemic canvas and the guide in answering them:\n\n1. Project Description: Describe your solution: Product + Customer + Benefit + Quantification. Try to think about the most relevant characteristics. Imagine you are explaining it to a child or to your grandma; you need to understand what better represents what your business does.it must also answer the following: What is your project about?, What is your solution?, What are its main characteristics? and How can you better describe your solution? \n\n2. Social and Demographic Trend: Social trend refer to the ways society reacts and behaves. Demography illustrates the changes in human population structures.\n• Analyze demographic and social changes happening both in the territory where your market is located and around the globe. \n• Look for trends around social behaviors and beliefs and demographic indicators such as births, deaths, migration, and education to understand the big picture.\n• This information may have an impact in your current business/project or may help you identify new opportunities to develop. \nIt must answer the following: Can you identify any new behavior being adopted by society?, Is the population increasing or decreasing in the region where your market is located?, Is people lifestyle different now than few years ago? Why? Is there anything that can change it again?, Are cultural changes provoking any challenge or problem? and Can you spot any opportunity or threat around people’s new behaviors and beliefs?\n\n3. Tech Trends: Technology changes are happening fast and they will most likely impact your business somehow.\n• Analyze technology trends around your industry and cross industries to understand how and where they can disrupt your business (in your value chain, market, manufacturing, sales, etc.)\n• Try to establish a technology strategy that can be implemented in your business and always keep track of technology trends. \nIt must answer the following: Is there any technological development that may disrupt your industry or your value chain?, Is there any technological development that may disrupt people lifestyle, working style, etc.?, Can you identify opportunities or challenges around these trends?, Do you have a technology strategy? and Can you benefit from some kind of technology? Can you implement it in your business?\n\n4. Industry Trends:  \n• It refers to any trend around the industry where you are competing.\n• Look for things that are challenging the industry or even disrupting it.\n• Try to understand what drives your industry and external factors and trends that may affect it.\n• You can discovery interesting opportunities and be prepare for any big change. \nit must answer the following: What is happening in your industry that has everyone nervous or impatient?, Is there any new breakthrough?, Is there a big challenge that must be solved?, Is there an opportunity that no one is spotting?, and Is there any external factor that is or will impact the industry?\n\n5. Economic, Regulatory, Legal & Political Trends:  \n• Every business must follow the policies and regulations of the region where they operate and sale, not following regulations may involve penalties or legal issues.\n• Economic trend is the direction in which the economy is moving in a region. In other words, it shows how a region is doing financially.\n• Look for factors such as government policy, labor law, tax policy, political stability, etc. and economy indicators such as economic growth, unemployment rate, interest and inflation rates, stock market, income, commodity prices, etc.\nit must answer the following: Does the region you are operating and selling has political stability?, How important is the copyright and patent law for your business?, Are you aware of the labor law and the health and safety regulation?, What is the tax policy that affects your transactions? Are there any incentives that may apply to your business?,  and Is there economic growth in the regions where you have operations? Or the economy is decreasing?\n\n6. Challenges and Opportunities: \n• Observe the world challenges and consider if a business opportunity can be generated.\n• Analyze the trends you search for to complete the canvas and identify challenges and possible opportunities.\n• Start by identifying problems and needs of people, the environment, animals etc., depending on your interests.\nit must answer the following: What problems can you identify in the environment?, What needs arise from social, technological and environmental trends?, What need people have that currently nobody is solving?, What would make people's lives easier?, and What negative situations in the world could become a business opportunity? \n\n7. Weakness: \n• They represent the flaws the business may have.\n• Consider your weaknesses from both an internal perspective and from the point of view of your value chain.\n• Compare your business with your competitors and identify what they have or do better and that represents a challenge for you.\n• By identifying your weaknesses it will be easier to overcome them.\nit must answer the following: What could you improve in your business?, What is preventing certain things of relevance from being achieved?, What represents a challenge, either internal or in your value chain?, What does your competition has that your company doesn’t?\n\n8. Strengths: \n• They are those characteristics of your company that will help you overcome challenges.\n• Consider your strengths from both an internal perspective and from the point of view of your value chain.\n• Think about your strengths in relation with your competitors and identify what your company has that competitors lack. \nit must answer the following: What advantages does your organization have?, Is there any particular characteristic that helps you make something easier, faster or better?, What does your company have that your competition doesn’t?, and Is there anything that your market or parts of your value chain identify as your company’s strengths?\n\n9. Competition: A competition analysis will give you a glimpse of the market environment.\n• You need to understand the number of competitors and their ability to threaten your company.\n• The number of competitors, along with the number of equivalent products and services they offer, dictates the power of a company.\n• A larger or smaller number of competitors may say something about the market and the barriers to enter it.\nit must answer the following: Are competitors in balance? Or is there a monopoly?, What does the competition look like in your market? How many rivals do you have and who are they?, Are there new entries from unexpected sources?, Is there any entry barrier?, and Is there anyone trying to disrupt the industry?\n"
    },
    {
      role: "assistant",
      content: "Nice to meet you! I'm KAHU, your guide to completing the Systemic Canvas for your startup. I'm trained based on the Ebelli book by Pedro López Sela, so you can trust that I'll be helping you navigate the 9 boxes to ensure a comprehensive understanding of your startup. Let's get started!\n\nWhich box would you like to begin with? Remember, each box has specific questions to help you reflect on your startup. I'll be here to assist you in answering those questions and providing guidance as needed."
    }
  ]);

  const toggleChat = () => {
    setIsOpen((prev) => !prev);
  };

  const handleSendMessage = () => {
    if (!input.trim()) return;

    const newUserMessage = { role: "user", content: input };
    const updatedConversation = [...conversation, newUserMessage];

    setMessages((prev) => [...prev, { text: input, fromUser: true }]);
    setInput("");
    setConversation(updatedConversation);

    const payload = {
      prompt: input,
      conversation: updatedConversation
    };

    fetch(CHATBOT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    })
      .then((res) => res.json())
      .then((data) => {
        let assistantResponse = data.task || "I'm sorry, I couldn't generate a response.";
        assistantResponse = assistantResponse.replace(/\*/g, "\n");

        setMessages((prev) => [...prev, { text: assistantResponse, fromUser: false }]);
        setConversation((prev) => [...prev, { role: "assistant", content: assistantResponse }]);
      })
      .catch((err) => {
        console.error("Error fetching AI reply:", err);
        setMessages((prev) => [
          ...prev,
          { text: "There was an error connecting to the server.", fromUser: false }
        ]);
      });
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleChange = (e) => {
    setInput(e.target.value);
  };

  return (
    <div className={cx(c.chatbotContainer)}>
      <button className={cx(c.chatButton)} onClick={toggleChat}>
        🤖
      </button>

      {isOpen && (
        <div className={cx(c.chatbotWindow)}>
          <div className={cx(c.header)}>
            <span style={{ fontWeight: "bold" }}>KAHU</span>
            <button className={cx(c.closeButton)} onClick={toggleChat}>
              ✖
            </button>
          </div>

          {/* Message Area */}
          <div className={cx(c.messageArea)}>
            <div
              className={cx(c.messageBlock)}
              style={{
                backgroundColor: "#dadada",
                color: "#3b3b3b",
                padding: ".8rem 1.2rem",
                borderRadius: 14,
                borderBottomLeftRadius: 0,
                borderBottomRightRadius: 24,
              }}
            >
              Hi! I am KAHU. Let me know if you have any questions. I'm here to help you!
            </div>

            {messages.map((msg, index) => (
              <div
                key={index}
                style={{
                  display: "flex",
                  justifyContent: msg.fromUser ? "flex-end" : "flex-start",
                  marginBottom: "1rem"
                }}
              >
                <div
                  className={cx(c.messageBlock)}
                  style={{
                    backgroundColor: msg.fromUser ? "#FF5F00" : "#e0e0e0",
                    color: msg.fromUser ? "white" : "black",
                    padding: ".8rem 1.2rem",
                    borderRadius: 10,
                  }}
                >
                  {msg.text}
                </div>
              </div>
            ))}
          </div>

          {/* Input Area */}
          <div className={cx(c.chatbotInputArea)}>
            <textarea
              className={cx(c.textarea)}
              name="chatbot-input"
              value={input}
              onChange={handleChange}
              onKeyDown={handleKeyPress}
              placeholder="Type your message"
              cols={2}
              rows={2}
            />
            <button onClick={handleSendMessage}>Send</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbot;