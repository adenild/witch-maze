class Reward {
    constructor() {
        this.newRewards = true;
        this.rewardsList = [];
        this.rewardsScore = 0;
        this.level = 1;
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
    generateRandomColor(){
        let colorList = [
            "/src/sprites/Items/PotionPurple.PNG",
            "/src/sprites/Items/PotionRed.PNG",
            "/src/sprites/Items/PotionAquamarine.PNG",
            "/src/sprites/Items/PotionEmerald.PNG"];

        let index = Math.floor(randomModule.random() * colorList.length);
        return colorList[index];
    };

    
}