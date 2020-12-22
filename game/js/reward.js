class Reward {
    constructor() {
        this.reset();
        this.newRewards = true;
        this.rewardsList = [];
        this.rewardsScore = 0;
        this.magicScore = 0;
        this.fourScoreVariables = [];
        this.level = 1;
        this.itemList = [
            ["assets/src/sprites/Icons/icons/16x16/potion_03a.png", "assets/src/sprites/Icons/icons/16x16/potion_03b.png", "assets/src/sprites/Icons/icons/16x16/potion_03c.png", "assets/src/sprites/Icons/icons/16x16/potion_03d.png", "assets/src/sprites/Icons/icons/16x16/potion_03e.png"],
            ["assets/src/sprites/Icons/icons/16x16/book_01b.png", "assets/src/sprites/Icons/icons/16x16/book_02b.png", "assets/src/sprites/Icons/icons/16x16/book_03b.png", "assets/src/sprites/Icons/icons/16x16/book_04b.png", "assets/src/sprites/Icons/icons/16x16/book_05b.png"],
            ["assets/src/sprites/Icons/icons/16x16/candy_01a.png", "assets/src/sprites/Icons/icons/16x16/candy_01b.png", "assets/src/sprites/Icons/icons/16x16/candy_01c.png", "assets/src/sprites/Icons/icons/16x16/candy_01d.png", "assets/src/sprites/Icons/icons/16x16/candy_01e.png"],
            ["assets/src/sprites/Icons/icons/16x16/shard_01a.png", "assets/src/sprites/Icons/icons/16x16/shard_01b.png", "assets/src/sprites/Icons/icons/16x16/shard_01c.png", "assets/src/sprites/Icons/icons/16x16/shard_01d.png", "assets/src/sprites/Icons/icons/16x16/shard_01e.png"]
        ]
    }

    reset() {
        this.newRewards = true;
        this.rewardsList = [];
        this.rewardsScore = 0;
        this.magicScore = 0;
        this.level = 1;
        $("#level").text(this.level);
        $("#rewardsScore").text(this.rewardsScore);
        $("#magicScore").text(this.magicScore);
    }
    countScore() {
        this.fourScoreVariables = generateRandomBetween(4,1,3,method);
        for (let r = 0; r < this.rewardsList.length; r++) {
            if (player.col === this.rewardsList[r][0] && player.row === this.rewardsList[r][1]) {
                this.magicScore += this.fourScoreVariables.reduce((a, b) => a * b);
                this.rewardsScore += 1;
                $("#rewardsScore").text(this.rewardsScore);
                $("#magicScore").text(this.magicScore);
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

    generateRandomItem(){
        let item = Math.floor(randomModule.random()*4);
        let variant = Math.floor(randomModule.random()*5);
        switch (item){
            case 0:
                return this.itemList[0][variant]
            case 1:
                return this.itemList[1][variant]
            case 2:
                return this.itemList[2][variant]
            case 3:
                return this.itemList[3][variant]
        }
    };
}