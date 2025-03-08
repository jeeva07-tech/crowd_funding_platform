import axios from "axios";
import { toast } from "react-toastify";
import config from "../config.js";

axios.defaults.headers.common["authorization"] =
  "Bearer " + localStorage.getItem("token");

export const getAllCampaigns = async () => {
  let dataToSend = [],
    err = undefined;
  try {
    const data = await axios.get(config.getAllCampaignsUrl());
    dataToSend = data.data;
  } catch (error) {
    err = error;
  }
  return { data: dataToSend, err: err };
};

export const getCampaignData = async (id) => {
  let dataToSend = {},
    err = undefined;
  try {
    const data = await axios.get(config.getCampaignDataByIdUrl(id));
    dataToSend = data.data;
  } catch (error) {
    err = error;
  }
  return { data: dataToSend, err: err };
};

export const newCampaign = async (data, props) => {
  try {
    const x = await axios.post(config.createNewCampaignUrl(), data);
    props.history.push("/campaign/" + x.data._id);
  } catch (e) {
    if (e.response && e.response.data) {
      toast.error(e.response.data.message);
    } else toast.error("Something went wrong");
  }
};

export const updateCampaign = async (data, props) => {
  try {
    const x = await axios.put(
      config.updateCampaignUrl(props.match.params.id),
      data
    );
    props.history.push("/campaign/" + x.data._id);
  } catch (e) {
    if (e.response && e.response.data) {
      toast.error(e.response.data.message);
    } else toast.error("Something went wrong");
  }
};

export const deleteCampaign = async (props) => {
  try {
    await axios.delete(config.deleteCampaignUrl(props.match.params.id));
    props.history.push("/");
  } catch (e) {
    if (e.response && e.response.data) {
      toast.error(e.response.data.message);
    } else toast.error("Something went wrong");
  }
};

// const d = [
//   {
//     _id: "abc1",
//     title: "This is title of crownd funding",
//     description:
//       "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Itaque dicta, accusamus sapiente ad aspernatur odio. Aspernatur, eum. Dolorem consequuntur molestias voluptatem reiciendis, deserunt unde placeat soluta perferendis exercitationem sit? Porro?",
//     imageUrl:
//       "data:image/jpeg;base64,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",
//     required: "1000",
//   },
//   {
//     _id: "abc2",
//     title: "This is title",
//     description:
//       "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Itaque dicta, accusamus sapiente ad aspernatur odio. Aspernatur, eum. Dolorem consequuntur molestias voluptatem reiciendis, deserunt unde placeat soluta perferendis exercitationem sit? Porro?",
//     imageUrl:
//       "data:image/jpeg;base64,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",
//     required: "1000",
//   },
//   {
//     _id: "abc3",
//     title: "This is title",
//     description:
//       "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Itaque dicta, accusamus sapiente ad aspernatur odio. Aspernatur, eum. Dolorem consequuntur molestias voluptatem reiciendis, deserunt unde placeat soluta perferendis exercitationem sit? Porro?",
//     imageUrl:
//       "data:image/jpeg;base64,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",
//     required: "1000",
//   },
//   {
//     _id: "abc4",
//     title: "This is title",
//     description:
//       "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Itaque dicta, accusamus sapiente ad aspernatur odio. Aspernatur, eum. Dolorem consequuntur molestias voluptatem reiciendis, deserunt unde placeat soluta perferendis exercitationem sit? Porro?",
//     imageUrl:
//       "data:image/jpeg;base64,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",
//     required: "1000",
//   },
// ];

// // // data for get campaign by id
// let image =
//   "data:image/jpeg;base64,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";
// let title = "This is title",
//   description =
//     "Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique, corporis dolores expedita, maiores dolorum ad dignissimos fugit voluptatem Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique, corporis dolores expedita, maiores dolorum ad dignissimos fugit voluptatem Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique, corporis dolores expedita, maiores dolorum ad dignissimos fugit voluptatem Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique, corporis dolores expedita, maiores dolorum ad dignissimos fugit voluptatem blanditiis, deleniti at? Eligendi assumenda eius illo accusantium possimus ducimus, nam vero.",
//   fundRequired = 1000,
//   fundRaised = 500,
//   numberOfPeopleDonated = 10;
// console.log("Id:", id);

// const campaign = {
//   image: image,
//   title: title,
//   description: description,
//   fundRequired: fundRequired,
//   fundRaised: fundRaised,
//   numberOfPeopleDonated: numberOfPeopleDonated,
// };
