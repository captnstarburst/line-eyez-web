import React, { useState, useCallback, useEffect } from "react";
import ReviewJSX from "./Review.jsx";
import { v4 as uuidv4 } from "uuid";
import { withRouter } from "react-router-dom";
import { withFirebase } from "../../Firebase";
import { compose } from "recompose";
import * as ROUTES from "../../constants/routes";

const Review = (props) => {
  const [tagDrawerOpen, setTagDrawerOpen] = useState(true);

  const [chipData, setChipData] = useState([
    [
      { key: 0, header: "Test_Type", id: "Test_Type" },
      { key: 1, label: "Pregnancy_Test", viewing: false },
      { key: 2, label: "Ovulation_Test", viewing: false },
    ],
  ]);

  const [addTopic, setAddTopic] = useState(null);
  const [mountUpload, setMountUpload] = useState(false);

  const toggleDrawer = useCallback(() => {
    setTagDrawerOpen((prevState) => !prevState);
  }, []);

  const handleChipSelection = (id) => {
    let indices = [];
    let dataCopy = [...chipData];
    chipData.forEach((topicArrays, topicIndex) => {
      if (indices.length > 0) return;
      topicArrays.forEach((item, itemIndex) => {
        if (indices.length > 0) return;
        if (item.label === id) indices = [topicIndex, itemIndex];
      });
    });

    let updatedTopicArray = [];

    updatedTopicArray.push(
      chipData[indices[0]].map((item, itemIndex) => {
        if (itemIndex === 0) return { key: item.key, header: id, id: item.id };
        if (itemIndex === indices[1])
          return { key: item.key, label: item.label, viewing: true };
        return { key: item.key, label: item.label, viewing: false };
      })
    );

    dataCopy.splice(indices[0], indices[0] + 1, ...updatedTopicArray);

    setChipData(dataCopy);

    if (chipData[indices[0]][0].id === "Test_Type") {
      setAddTopic(id);
    } else {
      setAddTopic(chipData[indices[0]][0].id);
    }
  };

  const handleChipDeletion = (id) => {
    let indices = [];
    let dataCopy = [...chipData];
    chipData.forEach((topicArrays, topicIndex) => {
      if (indices.length > 0) return;
      topicArrays.forEach((item, itemIndex) => {
        if (indices.length > 0) return;
        if (item.label === id) indices = [topicIndex, itemIndex];
      });
    });

    let updatedTopicArray = [];

    updatedTopicArray.push(
      chipData[indices[0]].map((item, itemIndex) => {
        if (itemIndex === 0)
          return { key: item.key, header: item.id, id: item.id };

        return { key: item.key, label: item.label, viewing: false };
      })
    );

    if (id === "Ovulation_Test") {
      dataCopy.pop();
      setMountUpload(false);
    } else if (id === "Pregnancy_Test") {
      dataCopy.pop();
      dataCopy.pop();
      setMountUpload(false);
    }

    dataCopy.splice(indices[0], indices[0] + 1, ...updatedTopicArray);

    if (id.substring(2, 5) === "DPO") {
      dataCopy.push(getDaysPastTransfer());
    } else if (id.substring(2, 5) === "DPT") {
      dataCopy.push(getDaysPastOvulation());
    }

    setChipData(dataCopy);
  };

  const getCycleDays = () => {
    return [
      { key: 3, header: "Cycle_Day", id: "Cycle_Day" },
      { key: 4, label: "CD 1", viewing: false },
      { key: 5, label: "CD 2", viewing: false },
      { key: 6, label: "CD 3", viewing: false },
      { key: 7, label: "CD 4", viewing: false },
      { key: 8, label: "CD 5", viewing: false },
      { key: 9, label: "CD 6", viewing: false },
      { key: 10, label: "CD 7", viewing: false },
      { key: 11, label: "CD 8", viewing: false },
      { key: 12, label: "CD 9", viewing: false },
      { key: 13, label: "CD 10", viewing: false },
      { key: 14, label: "CD 11", viewing: false },
      { key: 15, label: "CD 12", viewing: false },
      { key: 16, label: "CD 13", viewing: false },
      { key: 17, label: "CD 14", viewing: false },
      { key: 18, label: "CD 15", viewing: false },
      { key: 19, label: "CD 16", viewing: false },
      { key: 20, label: "CD 17", viewing: false },
      { key: 21, label: "CD 18", viewing: false },
      { key: 22, label: "CD 19", viewing: false },
      { key: 23, label: "CD 20", viewing: false },
      { key: 24, label: "CD 21", viewing: false },
      { key: 25, label: "CD 22", viewing: false },
      { key: 26, label: "CD 23", viewing: false },
      { key: 27, label: "CD 24", viewing: false },
      { key: 28, label: "CD 25", viewing: false },
      { key: 29, label: "CD 26", viewing: false },
      { key: 30, label: "CD 27", viewing: false },
      { key: 31, label: "CD 28", viewing: false },
      { key: 32, label: "CD 29", viewing: false },
      { key: 33, label: "CD 30", viewing: false },
      { key: 34, label: "CD 30 +", viewing: false },
    ];
  };

  const getDaysPastOvulation = () => {
    return [
      { key: 35, header: "Days_Past_Ovulation", id: "Days_Past_Ovulation" },
      { key: 36, label: "1 DPO", viewing: false },
      { key: 37, label: "2 DPO", viewing: false },
      { key: 38, label: "3 DPO", viewing: false },
      { key: 39, label: "4 DPO", viewing: false },
      { key: 40, label: "5 DPO", viewing: false },
      { key: 41, label: "6 DPO", viewing: false },
      { key: 42, label: "7 DPO", viewing: false },
      { key: 43, label: "8 DPO", viewing: false },
      { key: 44, label: "9 DPO", viewing: false },
      { key: 45, label: "10 DPO", viewing: false },
      { key: 46, label: "11 DPO", viewing: false },
      { key: 47, label: "12 DPO", viewing: false },
      { key: 48, label: "13 DPO", viewing: false },
      { key: 49, label: "14 DPO", viewing: false },
      { key: 50, label: "15 DPO", viewing: false },
      { key: 51, label: "16 DPO", viewing: false },
      { key: 52, label: "17 DPO", viewing: false },
      { key: 53, label: "18 DPO", viewing: false },
      { key: 54, label: "19 DPO", viewing: false },
      { key: 55, label: "20+ DPO", viewing: false },
    ];
  };

  const getDaysPastTransfer = () => {
    return [
      { key: 56, header: "Days_Past_Transfer", id: "Days_Past_Transfer" },
      { key: 57, label: "1 DPT", viewing: false },
      { key: 58, label: "2 DPT", viewing: false },
      { key: 59, label: "3 DPT", viewing: false },
      { key: 60, label: "4 DPT", viewing: false },
      { key: 61, label: "5 DPT", viewing: false },
      { key: 62, label: "6 DPT", viewing: false },
      { key: 63, label: "7 DPT", viewing: false },
      { key: 64, label: "8 DPT", viewing: false },
      { key: 65, label: "9 DPT", viewing: false },
      { key: 66, label: "10 DPT", viewing: false },
      { key: 67, label: "11 DPT", viewing: false },
      { key: 68, label: "12 DPT", viewing: false },
      { key: 69, label: "13 DPT", viewing: false },
      { key: 70, label: "14 DPT", viewing: false },
      { key: 71, label: "15 DPT", viewing: false },
      { key: 72, label: "16 DPT", viewing: false },
      { key: 73, label: "17 DPT", viewing: false },
      { key: 74, label: "18 DPT", viewing: false },
      { key: 75, label: "19 DPT", viewing: false },
      { key: 76, label: "20+ DPT", viewing: false },
    ];
  };

  const handleUpload = async () => {
    const uid = props.firebase.currentUserUID();
    const firestore = props.firebase.getFirestore();
    const uuid = uuidv4();

    let tags = [];
    chipData.forEach((topicArrays, topicIndex) => {
      topicArrays.forEach((item, itemIndex) => {
        if (item.viewing) tags.push(item.label);
      });
    });

    const uploadTask = props.firebase
      .getStorage()
      .child(`/Tests/${uid}/${uuid}`)
      .putString(props.url, "data_url");

    await uploadTask.on(
      "state_changed",
      null,
      (error) => {
        // setOnError(true);
      },
      () => {
        props.firebase
          .getStorage()
          .child(`/Tests/${uid}/${uuid}`)
          .getDownloadURL()
          .then((url) => {
            return firestore.collection("UploadedTests/").add({
              file_name: uuid,
              invalids: 0,
              negatives: 0,
              positives: 0,
              reported: false,
              tags,
              uploaded: props.firebase.timestampFrom(new Date()),
              uploaded_by: uid,
              url,
            });
          })
          .then(() => {
            props.history.push(ROUTES.My_Account + "/uploads");
          })
          .catch((err) => {
            // console.log(err);
          });
      }
    );
  };
  useEffect(() => {
    if (addTopic) {
      let updatedTopics = [];
      switch (addTopic) {
        case "Pregnancy_Test":
          updatedTopics = [
            chipData[0],
            getDaysPastOvulation(),
            getDaysPastTransfer(),
          ];

          setChipData(updatedTopics);
          break;
        case "Ovulation_Test":
          updatedTopics = [chipData[0], getCycleDays()];

          setChipData(updatedTopics);
          break;
        // case "Cycle_Day":
        // case "Days_Past_Ovulation":
        // case "Days_Past_Transfer":
        //   setMountUpload(true);
        //   break;
        default:
          break;
      }

      setMountUpload(true);
      setAddTopic(null);
    }
  }, [addTopic, chipData]);

  useEffect(() => {
    if (!props.url) {
      props.history.push(ROUTES.PHOTO);
    }
  }, [props.history, props.url]);

  return (
    <ReviewJSX
      toggleDrawer={toggleDrawer}
      tagDrawerOpen={tagDrawerOpen}
      chipData={chipData}
      handleChipSelection={handleChipSelection}
      handleChipDeletion={handleChipDeletion}
      handleUpload={handleUpload}
      mountUpload={mountUpload}
      url={props.url}
    />
  );
};

const ComposedReview = compose(withRouter)(Review);

export default withFirebase(ComposedReview);
