import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectFeedParameters, setPageSizeS } from '../features/feedParameters/feedParametersSlice';

function About() {
  // store test
  const feedParameters = useSelector(selectFeedParameters);
  const dispatch = useDispatch();
  // console.log(feedParameters);
  return (
    <div>
      <h3>This is &apos;about&apos; page</h3>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        Ut pretium facilisis porttitor. Nunc efficitur quis enim non cursus.
        Aliquam vel gravida nisi, et molestie nisi. Nam sagittis turpis ut malesuada pretium.
        Quisque ornare mauris ligula, vitae lacinia erat vestibulum eget.
        Vestibulum vel sollicitudin quam, ut dignissim dolor.
        Aenean tempus gravida nulla, eget cursus augue accumsan id.
        Aliquam in tempor mi, a sagittis quam.
      </p>
      <p>
        Pagesize:
        {feedParameters.pageSize}
      </p>
      <button onClick={() => dispatch(setPageSizeS(10))}>setFeedParams to 10</button>
      <button onClick={() => dispatch(setPageSizeS(20))}>setFeedParams to 20</button>
    </div>
  );
}

export default About;
