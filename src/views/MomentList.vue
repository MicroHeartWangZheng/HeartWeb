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
            <el-upload id="upload" :on-success="uploadSuccess" :action="uploadUrl" :multiple="true" :limit="9" :show-file-list="false">
              <i class="fa fa-picture-o pointer"></i>
            </el-upload>
            <el-dropdown class="pointer" @command="chooseTopic">
              <span class="link">
                #{{choosedTopic.name}}<i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item :command="topic" v-for="(topic,index) in topics" :key="index">#{{topic.name}}</el-dropdown-item>
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
          <div class="top pointer"  @click="redirect('/userDetail/'+moment.userId)">
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
            <div class="desc br">{{moment.content}}</div>
            <div class="pics">
              <el-image fit="cover" v-for="(pic,picIndex) in moment.pictures" :key="picIndex" :src="pic" :preview-src-list="moment.pictures"></el-image>
            </div>
            <div class="time">
              <span>{{moment.location+"  "+moment.time}}</span>
              <span class="link pointer" @click="clickTopic(moment.topicId)">#{{moment.topicName}}#</span>
            </div>
            <div class="bottom">
              <div class="bottomItem" @click="likeMoment(moment,momentIndex)">
                <div v-if="!moment.currentUserLike" class="fa fa-heart-o"></div>
                <div v-else class="fa fa-heart redColor"></div>
                <div class="count">{{moment.likeCount}}</div>
              </div>
              <div class="bottomItem" @click="unfoldComment(moment)">
                <div class="el-icon-chat-dot-round"></div>
                <div class="count">{{moment.commentCount}}</div>
              </div>
              <div class="bottomItem">
                <el-tooltip effect="dark" content="投诉" placement="top">
                  <span class="el-icon-warning-outline" @click="clickComplaint(moment.userId,moment.nickName,1,moment.id,moment.content)"></span>
                </el-tooltip>
              </div>
            </div>
          </div>
          <div v-if="moment.unfoldComment">
            <!--评论-->
            <div class="commentContainer">
              <div class="replyContainer">
                <div>
                  <el-avatar shape="circle" :src="user.headPic"></el-avatar>
                  <el-input class="reply" autosize type="textarea" placeholder="请输入内容" v-model="comment.content" maxlength="500"></el-input>
                </div>
                <div class="replyButton">
                  <div></div>
                  <div>
                    <el-button size="mini" @click="addComment(moment)" round>评论</el-button>
                  </div>
                </div>
              </div>
              <div class="line"></div>
              <!--评论-->
              <div class="commentItem" v-for="(comment,commentIndex) in moment.comments" :key="commentIndex">
                <div class="commentTop">
                  <div class="topLeft pointer" @click="redirect('/userDetail/'+comment.userId)">
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
                <div class="commentContent br">{{comment.content}}</div>
                <div class="commentBottom">
                  <div class="bottomLeft">
                    <div>{{comment.time}}</div>
                  </div>
                  <div class="bottomRight">
                    <el-tooltip effect="dark" content="投诉" placement="top">
                      <span class="el-icon-warning-outline fontIcon" @click="clickComplaint(comment.userId,comment.nickName,2,comment.id,comment.content)"></span>
                    </el-tooltip>
                    <el-tooltip effect="dark" content="回复" placement="top">
                      <span class="el-icon-chat-dot-round fontIcon" @click="clickReply(comment)"></span>
                    </el-tooltip>
                    <div @click="likeComment(comment)">
                      <el-tooltip effect="dark" content="点赞" placement="top">
                        <span v-if="comment.currentUserLike" class="fa fa-heart redColor fontIcon"></span>
                        <span v-else class="fa fa-heart-o fontIcon"></span>
                      </el-tooltip>
                      <span v-if="comment.likeCount>0" style="margin-left:4px;line-height:16px;">{{comment.likeCount}}</span>
                    </div>
                  </div>
                </div>

                <!--回复-->
                <div class="replyItem" v-for="(reply,replyIndex) in comment.replies" :key="replyIndex">
                  <div class="replyTop">
                    <div class="replyTopLeft pointer" @click="redirect('/userDetail/'+reply.userId)">
                      <el-avatar class="replyHeadPic" shape="circle" :src="reply.headPic"></el-avatar>
                      <div class="title">
                        <div>
                          <span v-if="reply.gender" class="fa fa-venus" style="margin-right:10px;color:blue;font-weight:700"></span>
                          <span v-else class="fa fa-mars" style="margin-right:10px;color:#ff6666;font-weight:700"></span>
                          <span style="font-size:14px;color:#ff6666;font-weight:700;">{{reply.nickName}}</span>
                        </div>
                        <div class="baseInfo">
                          <span>{{reply.year}}年 - {{reply.educationDesc}} - {{reply.currentCity}} - {{reply.career}}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="replyContent">
                    <span>
                      <span>回复</span>
                      <span class="link pointer" @click="redirect('/userDetail/'+reply.toUserId)">
                        {{reply.toUserNickName}}
                      </span>
                      <span>：</span>
                    </span>
                    <span>{{reply.content}}</span>
                  </div>
                  <div class="commentBottom">
                    <div class="bottomLeft">
                      <div>{{reply.time}}</div>
                    </div>
                    <div class="bottomRight">
                      <el-tooltip effect="dark" content="投诉" placement="top">
                        <span class="el-icon-warning-outline fontIcon" @click="clickComplaint(reply.userId,reply.nickName,3,reply.id,reply.content)"></span>
                      </el-tooltip>
                      <el-tooltip effect="dark" content="评论" placement="top">
                        <div class="el-icon-chat-dot-round fontIcon" @click="clickReply(comment,reply)"></div>
                      </el-tooltip>

                      <div @click="likeReply(reply)">
                        <el-tooltip effect="dark" content="点赞" placement="top">
                          <span v-if="reply.currentUserLike" class="fa fa-heart redColor fontIcon"></span>
                          <span v-else class="fa fa-heart-o fontIcon"></span>
                        </el-tooltip>
                        <span v-if="reply.likeCount>0" style="margin-left:4px;line-height:16px;">{{reply.likeCount}}</span>
                      </div>

                    </div>
                  </div>
                </div>
                <!--查看更多-->
                <el-link v-if="comment.replies.length!=comment.replyCount" @click="getReplyList(comment)" style="margin-left:100px;">共{{comment.replyCount}}条回复</el-link>
              </div>
              <!--查看更多-->
              <div class="line"></div>
              <div v-if="moment.comments.length!=moment.commentCount" @click="getCommentList(moment)" class="more pointer">
                查看更多({{moment.commentCount}}) >>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!--话题-->
    <div class="topicContainer">
      <div class="topicTitle">
        <span>话题</span>
      </div>
      <div class="pointer" v-for="(topic,index) in topics" :key="index">
        <span>#</span>
        <span>话题</span>
        <span class="link" @click="clickTopic(topic.id)">#{{topic.name}}#</span>
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
    <el-dialog class="dialog" :title="'我要投诉的是@'+complaintDialog.userName +'发表的'+(complaintDialog.reportObjectType==1?'动态':'评论')" style="" :visible.sync="complaintDialog.visible" width="30%">
      <span style="color:#409EFF">{{complaintDialog.userName}} :</span><span> {{complaintDialog.content}}</span>
      <el-input style="padding-top:20px" type="textarea" placeholder="投诉原因" :rows="3" maxlength="500" v-model="complaintDialog.reportContent"></el-input>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" style="border:none" @click="addReport">提 交</el-button>
      </span>
    </el-dialog>

  </div>

</template>

<script>
export default {
  data() {
    return {
      user: {},
      uploadUrl:process.env.VUE_APP_UploadUrl,
      moments: [],
      topics: [],
      choosedTopic: {},
      queryInfo: {
        pageIndex: 1,
        pageSize: 5,
        topicId: null,
        orderBy: "hot",
        isFollow: false,
        location: null,
      },
      totalCount: 0,
      currentIndex: 1,
      //发布动态
      moment: {
        topicId: null,
        content: null,
        pictures: [],
        anonymous: false, //是否匿名
        address: null, //详细地址
        location: null, //位置
        latitude: null,
        longitude: null,
      },
      comment: {
        content: null,
        momentId: null,
      },
      //回复对话框
      replyDialog: {
        visible: false,
        userName: null,
        content: null,
        comment: null,
        reply: null,
      },
      //投诉对话框
      complaintDialog: {
        visible: false,
        userId: null, //被举报的用户
        userName: "",
        content: "", //评论或者回复
        reportObjectType: 1, //举报对象  1:动态  2:评论  3:回复
        reportObjectId: null, //评论或者回复Id

        reportContent: "", //为什么举报？
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
    async addComment(moment) {
      if (!this.comment.content) {
        this.$message({
          message: "评论内容不能为空",
          type: "error",
        });
        return;
      }
      this.comment.momentId = moment.id;
      var res = await this.$http.post("Comment", this.comment);
      if (!res) return;
      this.comment.momentId = null;
      this.comment.content = null;
      moment.commentCount++;
      await this.getCommentList(moment, 1);
      this.$message({
        message: "评论成功!",
        type: "success",
      });
    },
    async addReply() {
      console.log("replyDialog", this.replyDialog);
      var data = {
        commentId: this.replyDialog.comment.id,
        content: this.replyDialog.content,
      };
      if (this.replyDialog.reply) {
        data.replyId = this.replyDialog.reply.id;
      }
      var res = await this.$http.post("Reply", data);
      if (!res) return;
      this.replyDialog.visible = false;
      this.replyDialog.content = null;
      await this.getReplyList(this.replyDialog.comment, 1);
    },
    async getTopicList() {
      var params = {
        pageIndex: 1,
        pageSize: 10,
      };
      var res = await this.$http.get("Topic", { params: params });
      if (!res) return;
      this.topics = res.data.items;
      this.choosedTopic = this.topics[0];
      this.moment.topicId = this.choosedTopic.id;
    },
    async getMomentList() {
      if (this.moments.length >= this.totalCount && this.totalCount != 0) {
        console.log("不需要查询");
        return;
      }
      var res = await this.$http.get("Moment", {
        params: this.queryInfo,
      });
      if (!res) return;
      res.data.items.forEach((moment) => {
        moment.unfoldComment = false;
        moment.comments = [];
        moment.commentQueryInfo = {
          pageIndex: 0,
          pageSize: 5,
          momentId: moment.id,
        };
      });
      if (this.queryInfo.pageIndex == 1) this.moments = res.data.items;
      else this.moments = this.moments.concat(res.data.items);
      this.totalCount = res.data.total;
      this.queryInfo.pageIndex++;
    },
    //展开评论
    async unfoldComment(moment) {
      if (!moment.unfoldComment) {
        await this.getCommentList(moment, 1);
      }
      moment.unfoldComment = !moment.unfoldComment;
    },
    async getCommentList(moment, pageIndex) {
      if (pageIndex) moment.commentQueryInfo.pageIndex = pageIndex;
      else moment.commentQueryInfo.pageIndex++;
      var res = await this.$http.get("Comment", {
        params: moment.commentQueryInfo,
      });
      res.data.items.forEach((comment) => {
        comment.replyQueryInfo = {
          pageIndex: 1,
          pageSize: 3,
          commentId: comment.id,
        };
      });
      if (pageIndex == 1) moment.comments = res.data.items;
      else moment.comments = moment.comments.concat(res.data.items);
    },
    //展开更多时
    async getReplyList(comment, pageIndex) {
      if (pageIndex) comment.replyQueryInfo.pageIndex = pageIndex;
      else comment.replyQueryInfo.pageIndex++;
      var res = await this.$http.get("Reply", {
        params: comment.replyQueryInfo,
      });
      if (pageIndex == 1) comment.replies = res.data.items;
      else comment.replies = comment.replies.concat(res.data.items);
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
    async likeComment(comment) {
      var res = await this.$http.patch("Comment/LikeOrNot/" + comment.id);
      if (res && !comment.currentUserLike) {
        comment.currentUserLike = true;
        comment.likeCount += 1;
      } else if (res && comment.currentUserLike) {
        comment.currentUserLike = false;
        comment.likeCount -= 1;
      }
    },
    async likeReply(reply) {
      var res = await this.$http.patch("Reply/LikeOrNot/" + reply.id);
      if (res && !reply.currentUserLike) {
        reply.currentUserLike = true;
        reply.likeCount += 1;
      } else if (res && reply.currentUserLike) {
        reply.currentUserLike = false;
        reply.likeCount -= 1;
      }
    },
    redirect(path) {
      console.log("path", path);
      this.$router.push(path);
    },
    //选择分类
    async chooseTitle(index) {
      this.currentIndex = index;
      if (index == 1) {
        //热门
        this.queryInfo.orderBy = "hot";
        this.queryInfo.isFollow = false;
        this.queryInfo.location = null;
      } else if (index == 2) {
        //实时
        this.queryInfo.orderBy = "time";
        this.queryInfo.isFollow = false;
        this.queryInfo.location = null;
      } else if (index == 3) {
        //关注
        this.queryInfo.orderBy = null;
        this.queryInfo.isFollow = true;
        this.queryInfo.location = null;
      } else {
        //附近
        this.queryInfo.orderBy = null;
        this.queryInfo.isFollow = false;
        this.queryInfo.location = this.moment.location;
      }
      this.queryInfo.pageIndex = 1;
      this.moments = [];
      await this.getMomentList();
    },
    //点击话题 展示话题下的动态
    async clickTopic(topicId) {
      if (topicId) this.queryInfo.topicId = topicId;
      this.moments = [];
      this.queryInfo.pageIndex = 1;
      await this.getMomentList();
    },
    chooseTopic(topic) {
      this.choosedTopic = topic;
      this.moment.topicId = topic.id;
    },
    //点击评论
    clickReply(comment, reply) {
      this.replyDialog.visible = true;
      this.replyDialog.userName = comment.nickName;
      this.replyDialog.comment = comment;
      if (reply) {
        this.replyDialog.reply = reply;
      }
    },
    //点击投诉
    clickComplaint(
      userId,
      nickName,
      reportObjectType,
      reportObjectId,
      content
    ) {
      this.complaintDialog.visible = true;
      this.complaintDialog.userName = nickName;
      this.complaintDialog.userId = userId;
      this.complaintDialog.reportObjectType = reportObjectType;
      this.complaintDialog.reportObjectId = reportObjectId;
      this.complaintDialog.content = content;
      console.log("举报信息", this.complaintDialog);
    },

    //添加投诉
    async addReport() {
      var data = {
        reportUserId: this.complaintDialog.userId,
        content: this.complaintDialog.reportContent,
      };
      switch (this.complaintDialog.reportObjectType) {
        case 1:
          data.momentId = this.complaintDialog.reportObjectId;
          break;
        case 2:
          data.commentId = this.complaintDialog.reportObjectId;
          break;
        case 3:
          data.replyId = this.complaintDialog.reportObjectId;
          break;
      }
      var res = await this.$http.post("Report", data);
      if (!res) return;
      this.complaintDialog.visible = false;
      this.complaintDialog.reportContent = "";
      this.$message({
        message: "举报成功,工作人员会在三个工作日处理完成。",
        type: "success",
      });
    },
    uploadSuccess(response, file, fileList) {
      this.moment.pictures = [];
      fileList.forEach((file) => {
        this.moment.pictures.push(file.response.data);
      });
    },
    removePic(index) {
      this.moment.pictures.splice(index, 1);
    },
    async getUser() {
      const res = await this.$http.get("User");
      if (!res) return;
      this.user = res.data;
    },
    getLocation() {
      let location = new BMap.Geolocation();
      location.getCurrentPosition((position) => {
        if (!position) return;
        this.moment.location = position.address.city;
        this.moment.address = position.address.street;
        this.moment.latitude = position.latitude;
        this.moment.longitude = position.longitude;
      });
    },
    async pullDown() {
      if (
        document.documentElement.scrollTop + window.innerHeight ==
        document.documentElement.scrollHeight
      ) {
        await this.getMomentList();
      }
    },
  },
  mounted() {
    window.addEventListener("scroll", this.pullDown);
  },
  created() {
    this.getMomentList();
    this.getUser();
    this.getTopicList();
    this.getLocation();
  },
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
        justify-content: flex-start;
        align-items: center;

        #upload {
          margin-right: 10px;
        }
        .fa-picture-o:hover {
          background-color: #fff2e5;
          color: #ff8200;
        }
        .el-dropdown {
          margin-right: 10px;
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
    // margin-bottom: 6px;
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
      margin: 20px 0px;
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
        line-height: 1.4;
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
          padding: 0px 20px 10px 50px;
          line-height: 1.5;
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
/deep/ .desc > textarea {
  border: none;
  resize: none;
}
.link {
  color: #409eff;
}
.link:hover {
  color: #66b1ff;
  font-weight: 700;
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