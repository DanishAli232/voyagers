import "./assets/styles/style.css";

type Props = {};

const ContactUs = (props: Props) => {
  return (
    <section id="AboutUs">
      <ul>
        <li>
          <label htmlFor="email">Email</label>
          <input type="text" placeholder="Email" id="email" name="email" />
        </li>

        <li>
          <label htmlFor="subject">Subject</label>
          <input type="text" placeholder="Subject" id="subject" name="subject" />
        </li>

        <li>
          <label htmlFor="description">Description</label>
          <input type="text" placeholder="Description" id="description" name="description" />
        </li>
      </ul>
    </section>
  );
};

export default ContactUs;
