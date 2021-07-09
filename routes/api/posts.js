const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const { body, validationResult } = require("express-validator");

const Post = require("../../models/Post");
const Profile = require("../../models/Profile");
const User = require("../../models/User");
const { route } = require("./profile");

// @route   POST api/posts
// @desc    create a post
// @access  Private
router.post(
  "/",
  [auth, [body("text", "Il testo è richiesto").not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const user = await User.findById(req.user.id).select("-password");
      const newPost = new Post({
        text: req.body.text,
        name: user.name,
        avatar: user.avatar,
        user: req.user.id,
      });

      const post = await newPost.save();

      res.json(post);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server error");
    }
  }
);

// @route   GET api/posts
// @desc    get all posts
// @access  private

router.get("/", auth, async (req, res) => {
  try {
    const posts = await Post.find().sort({ date: -1 });
    res.json(posts);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
});
// @route   GET api/posts/:id
// @desc    get post by ID
// @access  private

router.get("/:id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).send("Nessun post trovato");
    }
    res.json(post);
  } catch (error) {
    console.error(error.message);
    if (error.kind === "ObjectId") {
      return res.status(404).send("Nessun post trovato");
    }
    res.status(500).send("Server error");
  }
});

// @route   GET api/user/posts
// @desc    get posts for user
// @access  private

router.get("/user/posts", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    const posts = await Post.find({ user });
    if (!posts || posts.length === 0) {
      return res.status(404).send("Nessun post trovato");
    }
    res.json(posts);
  } catch (err) {
    res.status(500).send("Something went wrong, check logs");
  }
});

// @route   DELETE api/posts/:id
// @desc    delete post by ID
// @access  private

router.delete("/:id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).send("Nessun post trovato");
    }

    //check user
    if (post.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "Utente non autorizzato" });
    }

    await post.remove();
    res.json({ message: "Post eliminato con successo" });
  } catch (error) {
    console.error(error.message);
    if (error.kind === "ObjectId") {
      return res.status(404).send("Nessun post trovato");
    }
    res.status(500).send("Server error");
  }
});

// @route   Put api/posts/like/:id
// @desc    Like a postt
// @access  private

router.put("/like/:id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    //Check if post has already been liked

    if (
      post.likes.filter((like) => like.user.toString() === req.user.id).length >
      0
    ) {
      return res.status(400).send({ msg: "Hai già messo like a questo post" });
    }

    post.likes.unshift({ user: req.user.id });

    await post.save();

    res.json(post.likes);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
});
// @route   Put api/posts/unlike/:id
// @desc    Like a postt
// @access  private

router.put("/unlike/:id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    //Check if post has already been liked

    if (
      post.likes.filter((like) => like.user.toString() === req.user.id)
        .length === 0
    ) {
      return res.status(400).send({ msg: "Non hai ancora messo like al post" });
    }

    // Get remove index
    const removeIndex = post.likes
      .map((like) => like.user.toString())
      .indexOf(req.user.id);

    post.likes.splice(removeIndex, 1);

    await post.save();

    res.json(post.likes);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
});

// @route   POST api/posts/comment/:id (id of post)
// @desc    Comment on a post
// @access  Private
router.post(
  "/comment/:id",
  [auth, [body("text", "Il testo è richiesto").not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const user = await User.findById(req.user.id).select("-password");
      const post = await Post.findById(req.params.id);
      const newComment = {
        text: req.body.text,
        name: user.name,
        avatar: user.avatar,
        user: req.user.id,
      };

      post.comments.push(newComment);

      await post.save();

      res.json(post.comments);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server error");
    }
  }
);

// @route   DELETE api/posts/comment/:id/:comment_id (id of post)
// @desc    Delete comment on a post
// @access  Private

router.delete("/comment/:id/:comment_id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    // Pull out comment
    const comment = post.comments.find(
      (comment) => comment.id === req.params.comment_id
    );

    // Make sure comment exists

    if (!comment) {
      return res.status(404).send({ msg: "Il commento non esiste" });
    }

    // Check user
    if (comment.user.toString() !== req.user.id) {
      return res.status(401).send({ msg: "Utente non autorizzato" });
    }

    // Get remove index
    const removeIndex = post.comments
      .map((comment) => comment.user.toString())
      .indexOf(req.user.id);

    post.comments.splice(removeIndex, 1);

    await post.save();
    res.json(post);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;
