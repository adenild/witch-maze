class Reward {
    constructor() {
        this.newRewards = true;
        this.rewardsList = [];
        this.rewardsScore = 0;
        this.level = 1;
        this.imageList = [];
    };
    reset() {
        this.newRewards = true;
        this.rewardsList = [];
        this.rewardsScore = 0;
        this.level = 1;
        $("#level").text(this.level);
        $("#rewardsScore").text(this.rewardsScore);
    };
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
            }
        }
    };
    loadImages(){
        let pathList = [
            "/src/sprites/Icons/icons/16x16/potion_03a.png",
            "/src/sprites/Icons/icons/16x16/potion_03b.png",
            "/src/sprites/Icons/icons/16x16/potion_03c.png",
            "/src/sprites/Icons/icons/16x16/potion_03d.png",
            "/src/sprites/Icons/icons/16x16/potion_03e.png",
            "/src/sprites/Icons/icons/16x16/book_01b.png",
            "/src/sprites/Icons/icons/16x16/book_02b.png",
            "/src/sprites/Icons/icons/16x16/book_03b.png",
            "/src/sprites/Icons/icons/16x16/book_04b.png",
            "/src/sprites/Icons/icons/16x16/book_05b.png",
            "/src/sprites/Icons/icons/16x16/candy_01a.png",
            "/src/sprites/Icons/icons/16x16/candy_01b.png",
            "/src/sprites/Icons/icons/16x16/candy_01c.png",
            "/src/sprites/Icons/icons/16x16/candy_01d.png",
            "/src/sprites/Icons/icons/16x16/candy_01e.png",
            "/src/sprites/Icons/icons/16x16/shard_01a.png",
            "/src/sprites/Icons/icons/16x16/shard_01b.png",
            "/src/sprites/Icons/icons/16x16/shard_01c.png",
            "/src/sprites/Icons/icons/16x16/shard_01d.png",
            "/src/sprites/Icons/icons/16x16/shard_01e.png"
        ];
        for(let i = 0; i<pathList.length;i++){
            var img = new Image();
            img.src = pathList[i];
            this.imageList.push(img);
        }
        
    }
    generateRandomColor(){
        
        let index = Math.floor(randomModule.random() * this.imageList.length);
        
        return this.imageList[index];
    };

    
}