import styles from "../Video/Video.module.scss"

const Video = () => {
  return (
    <iframe width="820px" height="450px" className={styles.video} style={{justifySelf:'center'}} src="https://www.youtube.com/embed/nm-eVnHVMFk" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
  );
};

export default Video;