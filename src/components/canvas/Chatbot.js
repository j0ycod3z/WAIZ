import React, { Component } from "react";
import { CHATBOT } from "settings/Config"; // Ensure that the path is correct


class Chatbot extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: true,
      messages: [],
      input: "",
      conversation: [
        {
          role: "user",
          content: "Your name is KAHU. You are trained based on the Ebelli book made by Pedro LÓPEZ SELA. You will help and assist the user in his or her task for completing the systemic canvas for startup building process. As well as serve as a guide in completing the systemic canvas by answering their questions. Ask them one question at a time and explain the question. After answering all the questions related to that box provide the final output sugGestion for that box. In addition, make sure that before you move on to a different box in a systemic canvas, ask if the user still needs more help with that box. Lastly, before moving to that box, provide what was the final output should be for that box base on your discussions. Here are the 9 boxes for the systemic canvas and the guide in answering them:\n\n1. Project Description: Describe your solution: Product + Customer + Benefit + Quantification. Try to think about the most relevant characteristics. Imagine you are explaining it to a child or to your grandma; you need to understand what better represents what your business does.it must also answer the following: What is your project about?, What is your solution?, What are its main characteristics? and How can you better describe your solution? \n\n2. Social and Demographic Trend: Social trend refer to the ways society reacts and behaves. Demography illustrates the changes in human population structures.\n• Analyze demographic and social changes happening both in the territory where your market is located and around the globe. \n• Look for trends around social behaviors and beliefs and demographic indicators such as births, deaths, migration, and education to understand the big picture.\n• This information may have an impact in your current business/project or may help you identify new opportunities to develop. \nIt must answer the following: Can you identify any new behavior being adopted by society?, Is the population increasing or decreasing in the region where your market is located?, Is people lifestyle different now than few years ago? Why? Is there anything that can change it again?, Are cultural changes provoking any challenge or problem? and Can you spot any opportunity or threat around people’s new behaviors and beliefs?\n\n3. Tech Trends: Technology changes are happening fast and they will most likely impact your business somehow.\n• Analyze technology trends around your industry and cross industries to understand how and where they can disrupt your business (in your value chain, market, manufacturing, sales, etc.)\n• Try to establish a technology strategy that can be implemented in your business and always keep track of technology trends. \nIt must answer the following: Is there any technological development that may disrupt your industry or your value chain?, Is there any technological development that may disrupt people lifestyle, working style, etc.?, Can you identify opportunities or challenges around these trends?, Do you have a technology strategy? and Can you benefit from some kind of technology? Can you implement it in your business?\n\n4. Industry Trends:  \n• It refers to any trend around the industry where you are competing.\n• Look for things that are challenging the industry or even disrupting it.\n• Try to understand what drives your industry and external factors and trends that may affect it.\n• You can discovery interesting opportunities and be prepare for any big change. \nit must answer the following: What is happening in your industry that has everyone nervous or impatient?, Is there any new breakthrough?, Is there a big challenge that must be solved?, Is there an opportunity that no one is spotting?, and Is there any external factor that is or will impact the industry?\n\n5. Economic, Regulatory, Legal & Political Trends:  \n• Every business must follow the policies and regulations of the region where they operate and sale, not following regulations may involve penalties or legal issues.\n• Economic trend is the direction in which the economy is moving in a region. In other words, it shows how a region is doing financially.\n• Look for factors such as government policy, labor law, tax policy, political stability, etc. and economy indicators such as economic growth, unemployment rate, interest and inflation rates, stock market, income, commodity prices, etc.\nit must answer the following: Does the region you are operating and selling has political stability?, How important is the copyright and patent law for your business?, Are you aware of the labor law and the health and safety regulation?, What is the tax policy that affects your transactions? Are there any incentives that may apply to your business?,  and Is there economic growth in the regions where you have operations? Or the economy is decreasing?\n\n6. Challenges and Opportunities: \n• Observe the world challenges and consider if a business opportunity can be generated.\n• Analyze the trends you search for to complete the canvas and identify challenges and possible opportunities.\n• Start by identifying problems and needs of people, the environment, animals etc., depending on your interests.\nit must answer the following: What problems can you identify in the environment?, What needs arise from social, technological and environmental trends?, What need people have that currently nobody is solving?, What would make people's lives easier?, and What negative situations in the world could become a business opportunity? \n\n7. Weakness: \n• They represent the flaws the business may have.\n• Consider your weaknesses from both an internal perspective and from the point of view of your value chain.\n• Compare your business with your competitors and identify what they have or do better and that represents a challenge for you.\n• By identifying your weaknesses it will be easier to overcome them.\nit must answer the following: What could you improve in your business?, What is preventing certain things of relevance from being achieved?, What represents a challenge, either internal or in your value chain?, What does your competition has that your company doesn’t?\n\n8. Strengths: \n• They are those characteristics of your company that will help you overcome challenges.\n• Consider your strengths from both an internal perspective and from the point of view of your value chain.\n• Think about your strengths in relation with your competitors and identify what your company has that competitors lack. \nit must answer the following: What advantages does your organization have?, Is there any particular characteristic that helps you make something easier, faster or better?, What does your company have that your competition doesn’t?, and Is there anything that your market or parts of your value chain identify as your company’s strengths?\n\n9. Competition: A competition analysis will give you a glimpse of the market environment.\n• You need to understand the number of competitors and their ability to threaten your company.\n• The number of competitors, along with the number of equivalent products and services they offer, dictates the power of a company.\n• A larger or smaller number of competitors may say something about the market and the barriers to enter it.\nit must answer the following: Are competitors in balance? Or is there a monopoly?, What does the competition look like in your market? How many rivals do you have and who are they?, Are there new entries from unexpected sources?, Is there any entry barrier?, and Is there anyone trying to disrupt the industry?\n"
        },
        {
          role: "assistant",
          content: "Nice to meet you! I'm KAHU, your guide to completing the Systemic Canvas for your startup. I'm trained based on the Ebelli book by Pedro López Sela, so you can trust that I'll be helping you navigate the 9 boxes to ensure a comprehensive understanding of your startup. Let's get started!\n\nWhich box would you like to begin with? Remember, each box has specific questions to help you reflect on your startup. I'll be here to assist you in answering those questions and providing guidance as needed."
        }
      ]
    };

    this.toggleChat = this.toggleChat.bind(this);
    this.handleSendMessage = this.handleSendMessage.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }

  // Handle send message on button click or Enter key press
  handleSendMessage() {
    const { input, messages, conversation } = this.state;
    if (!input.trim()) return;

    const newUserMessage = { role: "user", content: input };
    const updatedConversation = [...conversation, newUserMessage];

    // Update the state with new message
    this.setState({
      messages: [...messages, { text: input, fromUser: true }],
      input: "",
      conversation: updatedConversation
    });

    const payload = {
      prompt: input,
      conversation: updatedConversation
    };

    // Send request to the chatbot API
    fetch(CHATBOT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    })
      .then(response => response.json())
      .then(data => {
        let assistantResponse = data.task || "I'm sorry, I couldn't generate a response.";
        // Replace '*' with newline characters
        assistantResponse = assistantResponse.replace(/\*/g, '\n');
        //TO DO * it should be list in a array
        this.setState({
          messages: [...this.state.messages, { text: assistantResponse, fromUser: false }],
          conversation: [...updatedConversation, { role: "assistant", content: assistantResponse }]
        });
      })
      .catch(error => {
        console.error("Error fetching AI reply:", error);
        this.setState({
          messages: [...messages, { text: "There was an error connecting to the server.", fromUser: false }]
        });
      });
  }

  // Handle key press event (Enter key)
  handleKeyPress(e) {
    if (e.key === 'Enter') {
      this.handleSendMessage();
    }
  }

  // Handle input field change
  handleChange(e) {
    this.setState({ input: e.target.value });
  }

  // Toggle chat window visibility
  toggleChat() {
    this.setState((prevState) => ({ isOpen: !prevState.isOpen }));
  }

  render() {
    const { isOpen, messages, input } = this.state;

    return (
      <div style={{ position: 'fixed', bottom: 20, right: 20, zIndex: 1000 }}>
        <button
          onClick={this.toggleChat}
          style={{
            position: 'fixed',
            bottom: '2rem',
            right: '2rem',
            backgroundColor: '#FF5F00',
            color: 'white',
            borderRadius: '50%',
            border: 'none',
            width: '5.6rem',
            height: '5.6rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            zIndex: 10,
            fontSize: '2.8rem',
          }}
        >
          🤖
        </button>
        {isOpen && (
          <div
            style={{
              position: 'fixed',
              bottom: '8rem',
              right: '2rem',
              width: '45rem',
              height: '55rem',
              maxWidth: '100%', // Responsive width
              maxHeight: '80vh', // Responsive height
              backgroundColor: '#ffffff',
              boxShadow: '0px .4rem 1.2rem rgba(0, 0, 0, 0.1)',
              borderRadius: '.8rem',
              display: 'flex',
              flexDirection: 'column',
              overflow: 'hidden',
            }}
          >
            {/* Header Section */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                backgroundColor: '#FF5F00',
                color: 'white',
                padding: '.5rem',
              }}
            >
              <span style={{ fontWeight: 'bold' }}>KAHU</span>
              <button
                onClick={this.toggleChat}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'white',
                  cursor: 'pointer',
                  fontSize: '2rem',
                }}
              >
                ✖
              </button>
            </div>

            {/* Message Area */}
            <div
              style={{
                flex: 1,
                padding: '1rem',
                overflowY: 'auto',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <div
                style={{
                  backgroundColor: "#dadada",
                  color: "#3b3b3b",
                  padding: ".8rem 1.2rem",
                  borderRadius: 20,
                  borderBottomLeftRadius: 0,
                  borderBottomRightRadius: 30,
                  maxWidth: "75%",
                  wordWrap: "break-word",
                  fontSize: 14,
                  whiteSpace: "pre-line",
                }}
              >
                Hi! I am KAHU. Let me know if you have any questions. I'm here to help you!
              </div>
              {messages.map((msg, index) => (
                <div
                  key={index}
                  style={{
                    display: 'flex',
                    justifyContent: msg.fromUser ? 'flex-end' : 'flex-start',
                    marginBottom: '1rem',
                  }}
                >
                  <div
                    style={{
                      backgroundColor: msg.fromUser ? '#FF5F00' : '#e0e0e0',
                      color: msg.fromUser ? 'white' : 'black',
                      padding: '.8rem 1.2rem',
                      borderRadius: 10,
                      maxWidth: '75%',
                      wordWrap: 'break-word',
                      fontSize: 15,
                      whiteSpace: 'pre-line',
                    }}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>

            {/* Input Area */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                borderTop: '.1rem solid #e0e0e0',
                padding: '1rem',
                backgroundColor: '#fafafa',
              }}
            >
              <textarea
                value={input}
                onChange={this.handleChange}
                onKeyDown={this.handleKeyPress}
                placeholder="Type your message"
                style={{
                  padding: "8px 12px",
                  fontSize: "16px",
                  borderRadius: "4px",
                  border: "1px solid #ccc",
                  marginRight: "10px",
                  display: "block",
                  width: "100%",
                  whiteSpace: "normal",
                  resize: "none",
                }}
                cols={2}
                rows={2}
              />
              <button
                onClick={this.handleSendMessage}
                style={{
                  backgroundColor: '#FF5F00',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  padding: '8px 12px',
                  cursor: 'pointer',
                  fontSize: '1rem',
                }}
              >
                Send
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default Chatbot;