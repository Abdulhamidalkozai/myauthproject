const router = require("express").Router();
const User = require("../Modals/User");
const bcrypt = require("bcrypt");

router.post("/register", async(req,res)=>{
    try{
        const salt = await bcrypt.genSalt(10);
        const hashedPassword= await bcrypt.hash(req.body.password,salt);


        const newUser= new User({
            userName: req.body.userName,
            email: req.body.email,
            password: hashedPassword,
        });
        const user = await newUser.save();
        res.status(200).json(user);

    }catch(error){
        res.status(500).json(error);

    }
})


router.post("/login", async(req,res)=>{
    try{
        const user = await User.findOne({userName:req.body.userName});
        const validate= await bcrypt.compare(req.body.password, user.password);
        if (!user || !validate) {
            return res.status(400).json({
              status_code: 0,
              error_msg: "Require Params Missing",
            });
          }
        try{
            const {password , ...others}= user._doc;
            res.status(200).json({
                status_code: 1,
                data: others,
              });
        }catch(err){
            return res.status(400).json({
                status_code: 0,
                error_msg: "Require Params Missing",
              });
        }

    //    const user = await User.findOne({userName:req.body.userName});
    //    !user && res.status(400).json("Wrong credintial")

    //    const validate= await bcrypt.compare(req.body.password, user.password);
    //    !validate && res.status(400).json("Wrong credential")

    //    const {password , ...others}= user._doc;

    //    res.status(200).json(others)

    }catch(error){
        res.status(500).json("Something went error");

    }
});



module.exports= router;