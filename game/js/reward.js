class Reward {
    constructor() {
        this.newRewards = true;
        this.rewardsList = [];
        this.rewardsScore = 0;
        this.level = 1;
        this.imageList = [];
    }

    reset() {
        this.newRewards = true;
        this.rewardsList = [];
        this.rewardsScore = 0;
        this.level = 1;
        $("#level").text(this.level);
        $("#rewardsScore").text(this.rewardsScore);
    }
    countScore() {
        for (let r = 0; r < this.rewardsList.length; r++) {
            if (player.col === this.rewardsList[r][0] && player.row === this.rewardsList[r][1]) {
                this.rewardsScore += 1;
                $("#rewardsScore").text(this.rewardsScore);
                this.rewardsList.splice(r, 1);
                if (this.rewardsList.length === 0) {
                    this.newRewards = true;
                    this.level += 1;
                    $("#level").text(this.level);
                }
                break;
            }
        }
    }
    
    async loadImages(){
        let pathList = [
            "assets/src/sprites/Icons/icons/16x16/potion_03a.png",
            "assets/src/sprites/Icons/icons/16x16/potion_03b.png",
            "assets/src/sprites/Icons/icons/16x16/potion_03c.png",
            "assets/src/sprites/Icons/icons/16x16/potion_03d.png",
            "assets/src/sprites/Icons/icons/16x16/potion_03e.png",
            "assets/src/sprites/Icons/icons/16x16/book_01b.png",
            "assets/src/sprites/Icons/icons/16x16/book_02b.png",
            "assets/src/sprites/Icons/icons/16x16/book_03b.png",
            "assets/src/sprites/Icons/icons/16x16/book_04b.png",
            "assets/src/sprites/Icons/icons/16x16/book_05b.png",
            "assets/src/sprites/Icons/icons/16x16/candy_01a.png",
            "assets/src/sprites/Icons/icons/16x16/candy_01b.png",
            "assets/src/sprites/Icons/icons/16x16/candy_01c.png",
            "assets/src/sprites/Icons/icons/16x16/candy_01d.png",
            "assets/src/sprites/Icons/icons/16x16/candy_01e.png",
            "assets/src/sprites/Icons/icons/16x16/shard_01a.png",
            "assets/src/sprites/Icons/icons/16x16/shard_01b.png",
            "assets/src/sprites/Icons/icons/16x16/shard_01c.png",
            "assets/src/sprites/Icons/icons/16x16/shard_01d.png",
            "assets/src/sprites/Icons/icons/16x16/shard_01e.png"
        ];
        for(let i = 0; i<pathList.length;i++){
            let img = new Image();
            img.src = pathList[i];
            this.imageList.push(img);
        }
    }
    generateRandomItem(){
        let index = Math.floor(randomModule.random() * this.imageList.length);
        return this.imageList[index];
    };
}