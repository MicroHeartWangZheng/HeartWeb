<template>
  <div class="page">
    <div class="contentContainer">

      <!---发表动态-->
      <div class="createMoment borderRadius">
        <el-input type="textarea" :autosize="{ minRows: 3, maxRows: 15}" maxlength="500" v-model="moment.content"></el-input>
        <div class="createMomentPics">
          <div class="picItemContainer" v-for="(pic,index) in moment.pictures" :key="index">
            <div class="fa fa-times" @click="removePic(index)"></div>
            <el-image class="picItem" :src="pic" :preview-src-list="moment.pictures"></el-image>
          </div>
        </div>
        <div class="bottom">
          <div class="left">
            <el-upload id="upload" :on-success="uploadSuccess" action="https://localhost/api/File/Upload" :multiple="true" :limit="9" :show-file-list="false">
              <i class="fa fa-picture-o pointer"></i>
            </el-upload>
            <el-dropdown class="topic pointer">
              <span class="el-dropdown-link">
                #话题<i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>#黄金糕</el-dropdown-item>
                <el-dropdown-item>#狮子头</el-dropdown-item>
                <el-dropdown-item>#螺蛳粉</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
          <div class="right pointer" @click="addMoment">发 布</div>
        </div>
      </div>

      <!--标题-->
      <div class="titleContainer borderRadius">
        <div @click="chooseTitle(1)" :class="1==currentIndex?'chooseTitle':''">热门</div>
        <div @click="chooseTitle(2)" :class="2==currentIndex?'chooseTitle':''">实时</div>
        <div @click="chooseTitle(3)" :class="3==currentIndex?'chooseTitle':''">关注</div>
        <div @click="chooseTitle(4)" :class="4==currentIndex?'chooseTitle':''">附近</div>
      </div>

      <!--动态列表--->
      <div class="momentList borderRadius">
        <div class="momentItem borderRadius" v-for="(moment,momentIndex) in moments" :key="momentIndex">
          <!--用户信息-->
          <div class="top pointer">
            <el-avatar class="headPic" shape="square" :src="moment.headPic"></el-avatar>
            <div class="title">
              <div>
                <span v-if="moment.gender" class="fa fa-venus" style="margin-right:10px;color:blue;font-weight:700"></span>
                <span v-else class="fa fa-mars" style="margin-right:10px;color:#ff6666;font-weight:700"></span>
                <span style="font-size:14px;color:#ff6666;font-weight:700;">{{moment.nickName}}</span>
              </div>
              <div class="baseInfo">
                <span>{{moment.year}}年 - {{moment.educationDesc}} - {{moment.currentCity}} - {{moment.career}}</span>
              </div>
            </div>
          </div>
          <!--动态-->
          <div class="content">
            <div class="desc">
              {{moment.content}}
            </div>
            <div class="pics">
              <el-image fit="cover" v-for="(pic,picIndex) in moment.pictures" :key="picIndex" :src="pic" :preview-src-list="moment.pictures"></el-image>
            </div>
            <div class="time">
              <span>{{moment.time}}</span>
              <span>#单身狗的生活#</span>
            </div>
            <div class="bottom">
              <div class="bottomItem" @click="likeMoment(moment)">
                <div v-if="!moment.currentUserLike" class="fa fa-heart-o"></div>
                <div v-else class="fa fa-heart redColor"></div>
                <div class="count">{{moment.likeCount}}</div>
              </div>
              <div class="bottomItem" @click="unfoldComment(moment,momentIndex)">
                <div class="el-icon-chat-dot-round"></div>
                <div class="count">{{moment.commentCount}}</div>
              </div>
              <div class="bottomItem">
                <span class="el-icon-share"></span>
                <div class="count">转发</div>
              </div>
            </div>
          </div>
          <div v-if="moment.unfoldComment">
            <!--评论-->
            <div class="commentContainer">
              <div class="replyContainer">
                <div>
                  <el-avatar shape="circle" :src="moment.headPic"></el-avatar>
                  <el-input class="reply" autosize type="textarea" placeholder="请输入内容" v-model="myComment.content" maxlength="500"></el-input>
                </div>
                <div class="replyButton">
                  <div></div>
                  <div>
                    <el-button size="mini" round>发表</el-button>
                  </div>
                </div>
              </div>
              <div class="line"></div>
              <!--评论-->
              <div class="commentItem" v-for="(comment,commentIndex) in moment.comments" :key="commentIndex">
                <div class="commentTop">
                  <div class="topLeft pointer">
                    <el-avatar class="commentHeadPic" shape="circle" :src="comment.headPic"></el-avatar>
                    <div class="title">
                      <div>
                        <span v-if="comment.gender" class="fa fa-venus" style="margin-right:10px;color:blue;font-weight:700"></span>
                        <span v-else class="fa fa-mars" style="margin-right:10px;color:#ff6666;font-weight:700"></span>
                        <span style="font-size:14px;color:#ff6666;font-weight:700;">{{comment.nickName}}</span>
                      </div>
                      <div class="baseInfo">
                        <span>{{comment.year}}年 - {{comment.educationDesc}} - {{comment.currentCity}} - {{comment.career}}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="commentContent">
                  {{comment.content}}
                </div>
                <div class="commentBottom">
                  <div class="bottomLeft">
                    <div>{{comment.createTime}}</div>
                  </div>
                  <div class="bottomRight">
                    <el-tooltip effect="dark" content="投诉" placement="top">
                      <span class="el-icon-warning-outline fontIcon" @click="clickComplaint(comment.userId,comment.nickName,comment.content)"></span>
                    </el-tooltip>
                    <el-tooltip effect="dark" content="回复" placement="top">
                      <span class="el-icon-chat-dot-round fontIcon" @click="clickReply(comment)"></span>
                    </el-tooltip>
                    <div @click="likeComment(comment,momentIndex,commentIndex)">
                      <el-tooltip effect="dark" content="点赞" placement="top">
                        <span v-if="comment.currentUserLike" class="fa fa-heart redColor fontIcon"></span>
                        <span v-else class="fa fa-heart-o fontIcon"></span>
                      </el-tooltip>
                      <span style="margin-left:4px;line-height:16px;">{{comment.likeCount}}</span>
                    </div>
                  </div>
                </div>

                <!--回复-->
                <div class="replyItem" v-for="(reply,index) in comment.replies" :key="index">
                  <div class="replyTop">
                    <div class="replyTopLeft pointer">
                      <el-avatar class="replyHeadPic" shape="circle" :src="reply.headPic"></el-avatar>
                      <div class="title">
                        <div class="nickName">{{reply.nickName}}</div>
                        <div class="baseInfo">
                          <span>{{reply.year}}年 - {{reply.educationDesc}} - {{reply.currentCity}} - {{reply.career}}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="replyContent">
                    <span>
                      <span>回复</span>
                      <span>
                        <el-link :href="'userDetail/'+reply.userId" :underline="false" type="primary">{{reply.toUserNickName}}</el-link>
                      </span>
                      <span>：</span>
                    </span>
                    <span>{{reply.content}}</span>
                  </div>
                  <div class="commentBottom">
                    <div class="bottomLeft">
                      <div>{{reply.createTime}}</div>
                    </div>
                    <div class="bottomRight">
                      <el-tooltip effect="dark" content="投诉" placement="top">
                        <span class="el-icon-warning-outline fontIcon" @click="clickComplaint(reply.userId,reply.nickName,reply.content)"></span>
                      </el-tooltip>
                      <el-tooltip effect="dark" content="评论" placement="top">
                        <div class="el-icon-chat-dot-round fontIcon" @click="clickReply(comment,reply)"></div>
                      </el-tooltip>
                      <el-tooltip effect="dark" content="点赞" placement="top">
                        <div v-if="!reply.like" class="fa fa-heart-o fontIcon"></div>
                        <div v-else class="fa fa-heart redColor fontIcon"></div>
                      </el-tooltip>
                    </div>
                  </div>
                </div>
                <!--查看更多-->
                <el-link v-if="comment.replyCount>3" style="margin-left:100px;">共{{comment.replyCount}}条回复</el-link>
              </div>
              <!--查看更多-->
              <div class="line"></div>
              <div v-if="moment.commentCount>10" class="more pointer">
                查看更多 >
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="topicContainer">
      <div class="topicTitle">
        <span>话题</span>
      </div>
      <div>
        <span>#</span>
        <span>话题</span>
        <span>#热门话题1#</span>
      </div>
      <div>
        <span>#</span>
        <span>话题</span>
        <span>#热门话题2#</span>
      </div>
      <div>
        <span>#</span>
        <span>话题</span>
        <span>#热门话题3#</span>
      </div>
      <div>
        <span>#</span>
        <span>话题</span>
        <span>#热门话题4#</span>
      </div>
    </div>
    <!--回复对话框-->
    <el-dialog class="dialog" :title="'回复@'+replyDialog.userName" :visible.sync="replyDialog.visible" width="30%">
      <el-input type="textarea" :rows="3" maxlength="500" v-model="replyDialog.content"></el-input>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" style="border:none" @click="addReply">回 复</el-button>
      </span>
    </el-dialog>

    <!--投诉对话框-->
    <el-dialog class="dialog" :title="'我要投诉的是@'+complaintDialog.userName +'发表的评论'" style="" :visible.sync="complaintDialog.visible" width="30%">
      <span style="color:#409EFF">{{complaintDialog.userName}} :</span><span> {{complaintDialog.commentContent}}</span>
      <el-input style="padding-top:20px" type="textarea" placeholder="投诉原因" :rows="3" maxlength="500" v-model="complaintDialog.content"></el-input>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" style="border:none" @click="complaintDialog.visible = false">提 交</el-button>
      </span>
    </el-dialog>

  </div>

</template>
<script>
export default {
  data() {
    return {
      queryInfo: {
        pageIndex: 1,
        pageSize: 10,
      },
      totalCount: 0,
      currentIndex: 1,
      //发布动态
      moment: {
        topic: null,
        content: null,
        pictures: [],
        anonymous: false, //是否匿名
        address: null,
        location: null,
        latitude: null,
        longitude: null,
      },
      //回复对话框
      replyDialog: {
        visible: false,
        userName: null,
        content: null,
        commentId: null,
        replyId: null,
      },
      //投诉对话框
      complaintDialog: {
        visible: false,
        userId: 1,
        userName: "",
        commentContent: "",
        content: "",
      },
      moments: [],

      user: {
        headPic:
          "https://heart.lostsea.cn/upload/2021-02-07/96603cdd851f45bfa0939db49a8e8829.jpg",
      },
      myComment: {
        content: "",
      },
    };
  },
  methods: {
    async addMoment() {
      if (!this.moment.content) {
        this.$message({
          message: "发布内容不能为空",
          type: "error",
        });
        return;
      }
      var res = await this.$http.post("Moment", this.moment);
      if (!res) return;
      this.moment.topic = null;
      this.moment.content = null;
      this.moment.pictures = [];
      await this.getMomentList();
      this.$message({
        message: "发布成功!",
        type: "success",
      });
    },
    async getMomentList() {
      var res = await this.$http.get("Moment");
      if (!res) return;
      this.moments = res.data.items;
      this.totalCount = res.data.total;
    },
    async getCommentList(moment, momentIndex) {
      moment.commentQueryInfo = {
        pageIndex: 1,
        pageSize: 10,
        momentId: moment.id,
      };
      var res = await this.$http.get("Comment", {
        params: moment.commentQueryInfo,
      });
      moment.comments = res.data.items;
      moment.commentQueryInfo.totalCount = res.data.total;
      Object.assign(this.moments[momentIndex], moment);
    },
    //展开更多时
    async getReplyList(comment) {
      comment.replyQueryInfo = {
        pageIndex: 1,
        pageSize: 10,
        commentId: comment.id,
      };
      var res = await this.$http.get("Reply", {
        params: comment.replyQueryInfo,
      });
      comment.replys = res.data.items;
      comment.replyQueryInfo.totalCount = res.data.total;
    },
    async likeMoment(moment) {
      var res = await this.$http.patch("Moment/LikeOrNot/" + moment.id);
      if (res && !moment.currentUserLike) {
        moment.currentUserLike = true;
        moment.likeCount += 1;
      } else if (res && moment.currentUserLike) {
        moment.currentUserLike = false;
        moment.likeCount -= 1;
      }
    },
    async likeComment(comment, momentIndex, commentIndex) {
      var res = await this.$http.patch("Comment/LikeOrNot/" + comment.id);
      if (res && !comment.currentUserLike) {
        comment.currentUserLike = true;
        comment.likeCount += 1;
      } else if (res && comment.currentUserLike) {
        comment.currentUserLike = false;
        comment.likeCount -= 1;
      }
      comment.likeCount = 1;
      // Object.assign(this.moments[momentIndex].comments[commentIndex], comment);
      this.$set(
        this.moments[momentIndex].comments[commentIndex],
        "likeCount",
        10
      );
      console.log("comment", this.moments[momentIndex].comments[commentIndex]);
    },
    async addReply() {
      var data = {
        commentId: this.replyDialog.commentId,
        content: this.replyDialog.content,
        replyId: this.replyDialog.replyId,
      };
      var res = await this.$http.post("Reply", data);
      if (res) {
        this.replyDialog.visible = false;
        this.replyDialog.content = null;
      }
    },
    redirect(path) {
      this.$router.push(path);
    },
    //展开评论
    async unfoldComment(moment, momentIndex) {
      if (!moment.unfoldComment) {
        await this.getCommentList(moment, momentIndex);
      }
      moment.unfoldComment = !moment.unfoldComment;
    },
    //选择分类
    chooseTitle(index) {
      this.currentIndex = index;
    },
    //点击评论
    clickReply(comment, reply) {
      this.replyDialog.visible = true;
      this.replyDialog.userName = comment.nickName;
      this.replyDialog.commentId = comment.id;
      if (reply) {
        this.replyDialog.replyId = reply.id;
      }
    },
    //点击投诉
    clickComplaint(userId, nickName, commentContent) {
      this.complaintDialog.visible = true;
      this.complaintDialog.userName = nickName;
      this.complaintDialog.userId = userId;
      this.complaintDialog.commentContent = commentContent;
    },
    uploadSuccess(response, file, fileList) {
      this.moment.pictures = [];
      fileList.forEach((file) => {
        this.moment.pictures.push("https://localhost" + file.response.data);
      });
    },
    removePic(index) {
      this.moment.pictures.splice(index, 1);
    },
  },
  mounted() {
    this.getMomentList();
  },
  created() {},
};
</script>
<style lang="less" scoped>
.page {
  width: 100%;
  padding-top: 30px;
  display: flex;
  justify-content: space-between;
}
.contentContainer {
  width: 674px;
  padding: 0px 10px;
  .createMoment {
    background-color: #fff;
    padding: 20px 20px 10px 20px;
    margin-bottom: 8px;
    color: #838383;
    .createMomentPics {
      display: flex;
      justify-content: flex-start;
      align-items: flex-start;
      flex-wrap: wrap;
      margin: 10px auto;
      .picItemContainer {
        position: relative;
      }
      .fa {
        position: absolute;
        right: 6px;
        top: 0;
        color: #ff7777;
        z-index: 100;
      }
      .fa:hover {
        color: #ff6666;
      }
      .picItem {
        width: 120px;
        height: 120px;
        border-radius: 8px;
        margin-right: 6px;
      }
    }
    .bottom {
      display: flex;
      justify-content: space-between;
      height: 26px;
      .left {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100px;
        .fa-picture-o:hover {
          background-color: #fff2e5;
          color: #ff8200;
        }
        .el-dropdown-link:hover {
          color: #ff8200;
          font-weight: 700;
        }
      }
      .right {
        padding: 0px 15px;
        font-size: 14px;
        line-height: 26px;
        background-color: #ff7777;
        color: #fff;
        border-radius: 13px;
      }
      .right:hover {
        background-color: #ff6666;
      }
    }
  }
  .titleContainer {
    height: 44px;
    font-size: 14px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    background-color: #fff;
    margin-bottom: 10px;
    div {
      width: 60px;
      height: 28px;
      line-height: 28px;
      border-radius: 14px;
      margin: 0 5px;
      text-align: center;
    }
    div:hover {
      background-color: #fff2e5;
      color: #ff8200;
    }
  }
}
.el-upload-list__item,
.el-upload {
  width: 100px !important;
  height: 100px !important;
}
.momentList {
  display: flex;
  justify-content: flex-start;
  flex-direction: column;

  .momentItem {
    padding: 20px 20px 14px 14px;
    background-color: #fff;
    margin-bottom: 10px;
    display: flex;
    justify-content: flex-start;
    flex-direction: column;
  }
  .top {
    display: flex;
    justify-content: flex-start;
    height: 50px;
    margin-bottom: 6px;
    .headPic {
      width: 50px;
      height: 50px;
    }
  }
  .content {
    margin: 10px 0 0 50px;
    .desc {
      line-height: 1.5;
      font-size: 14px;
    }
    .pics {
      display: flex;
      justify-content: flex-start;
      align-items: flex-start;
      flex-wrap: wrap;

      .el-image {
        margin: 8px 5px 0 5px;
        height: 188px;
        width: 186px;
        border-radius: 5px;
        &:last-child {
          margin-right: 0;
        }
      }
    }
    .time {
      margin: 10px 8px;
      display: flex;
      justify-content: space-between;
      font-size: 10px;
      color: #999999;
    }
    .bottom {
      margin: 15px 0 0 0;
      width: 580px;
      display: flex;
      justify-content: space-between;
    }
    .bottomItem {
      display: flex;
      justify-content: flex-start;
      color: grey;
      .count {
        font-size: 12px;
        line-height: 16px;
        margin-left: 4px;
      }
    }
    .bottomItem:hover {
      color: #ff7777;
    }
  }
  .commentContainer {
    margin-top: 20px;
    .replyContainer {
      display: flex;
      justify-content: flex-start;
      flex-direction: column;
      padding-right: 20px;
      div {
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
      .reply {
        margin-left: 10px;
      }
    }
    .replyButton {
      margin-top: 8px;
    }
    .commentItem {
      .commentTop {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 10px 20px 0px 0px;
        .topLeft {
          display: flex;
          justify-content: flex-start;
        }
      }
      .commentContent {
        margin-left: 50px;
        font-size: 14px;
        margin-bottom: 10px;
        padding-right: 20px;
      }

      .replyItem {
        margin-left: 50px;
        font-size: 14px;
        .replyTop {
          display: flex;
          justify-content: space-between;
          align-items: center;
          .replyTopLeft {
            display: flex;
            justify-content: flex-start;
            align-items: center;
          }
          .replyTopRight {
            padding-right: 20px;
          }
        }
        .replyContent {
          display: flex;
          justify-content: flex-start;
          padding: 0px 20px 10px 50px;
        }
      }
    }
    .more {
      text-align: center;
      margin: auto;
      height: 20px;
      line-height: 20px;
      padding-top: 10px;
      font-size: 14px;
    }
    .more:hover {
      color: #e6a23c;
    }
  }
}

/*  加粗标题 */
.chooseTitle {
  font-weight: 700;
  color: #ff8200;
}
/* 图标 */
.commentBottom {
  color: #939393;
  margin-left: 50px;
  padding: 0 20px 10px 0;
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  line-height: 20px;
}

.bottomRight {
  width: 90px;
  display: flex;
  justify-content: space-between;
  .fontIcon {
    font-size: 16px;
  }
  .fontIcon:hover {
    color: #ff7777;
  }
}

.topicContainer {
  width: 260px;
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  align-items: flex-start;
  background-color: #fff;
  div {
    height: 40px;
    line-height: 40px;
    font-size: 14px;
    padding: 0 24px;
  }
  .topicTitle {
    font-size: 16px;
    padding: 0 20px;
  }
}

.el-button {
  background-color: #ff7777;
  color: #fff;
}
.el-button:hover {
  background-color: #ff6666;
  color: #fff;
}
.title {
  margin-left: 10px;
  display: flex;
  padding: 5px;
  justify-content: space-between;
  flex-direction: column;
  height: 40px;
  margin-bottom: 6px;
}
.nickName {
  font-size: 14px;
  color: #ff6666;
  font-weight: 700;
}
.baseInfo {
  font-size: 12px;
  color: #29292;
}

.redColor {
  color: #ff6666;
}
.borderRadius {
  border-radius: 8px;
}
.dialog {
  .el-dialog__body {
    padding: 20px;
  }
}
</style>