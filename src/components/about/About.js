/* eslint-disable react/no-unescaped-entities */
import React from 'react';

import SignupModal from '../modal/SignupModal';

const About = props => {
  props.setTheme('dark');
  props.setTitle('About Us');

  return (
    <div className="">
      <section className="partnerwrapper">
        <div className="partner-content-wrapper">
          <div className="partner-container">
            <div className="row">
              <div className="col-md-6 col-xs-12 about-sec">
               
                <p>
                  Hi there. We’re a new entertainment platform that will harness the power of entertainment to inspire,
                  entertain, and transform lives.
                </p>
                <p>
                  We’ll be sharing a host of original, unexpected, commercial-free programming ranging from comedies to
                  dramas, realities to docu-series.
                </p>
                <p>
                  Our shows will deal with relationships, career, money, family and a lot more relevant and difficult
                  subjects in transparent, unforgettable ways. We’ll explore what it’s like to raise a family ​right
                  now​, to build a career off the beaten path, to become an entrepreneur in today’s volatile economy,
                  and to make clear the unique challenges Millennials and Gen Z are facing. Sounds like a lot, right?
                  Well, adulting is​ a lot.
                </p>
                <p>
                  Through these stories, some inspiring, some difficult, and some laugh out loud funny, we hope to take
                  the taboo out of certain subjects and transform them into a comfortable conversation that’s both
                  compelling as well as personally empowering.
                </p>
                <p>
                  <strong>What’s our​ <i>Why</i> ​at Million Stories​? </strong>
                </p>
                <p>
                  We’re the largest generation of adults in America, but we haven't learned how to make the system work
                  for us. Most of us don't even know what we don't know. The truth is, not everyone knows where to
                  start. It even seems overwhelming. Here's why.
                 <p></p>
                  <ul>
                    <li>Only 44% of Millennials are financially literate.</li>
                    <li>The average Millennial is $42,000 in debt.</li>
                    <li>Collectively, we have $1.5 trillion in student loan debt.</li>
                    <li>The under-25 age group is the fastest-growing group filing for bankruptcy.</li>
                    <li>More than 78% of Americans, many of them us and our parents, livepaycheck to paycheck.</li>
                  </ul>
                </p>
                <p>
                  Millennials alive today are expected to live into our 90s. We've got to find solutions that work. And
                  fast.
                </p>
                <p>
                  <strong>Million Stories has one goal:​ <i>Your success.</i></strong>
                </p>               
                <p>
                  With the right resources and skills, we can build a future that works for us, and maybe even for
                  everybody.
                </p>
                <p>
                  In addition to our entertainment programming, we’ll be offering a wide array of trustworthy learning
                  resources. (One reason they’re trustworthy: We’re not selling anything.) We’ll give you the tools to
                  become financially savvy, strong, and independent, no matter where you are in your financial life at
                  the moment.
                </p>

                <p>                 
                  Even in today’s difficult market, you can be stronger financially, and one of our main goals is to
                  help make that happen. We’re a project of {' '}
                  <a
                    href="http://singletonfoundation.org"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-link"
                  >
                   Singleton Foundation for Financial Literacy and Entrepreneurship 
                  </a> a 501(c)(3) non-profit, and making our audience—you—financially competent, with the ability to think
                  like an entrepreneur, is our mission.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
