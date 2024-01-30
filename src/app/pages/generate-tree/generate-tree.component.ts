import { NestedTreeControl } from '@angular/cdk/tree';
import { Component, OnInit } from '@angular/core';
import { MatTreeNestedDataSource } from '@angular/material/tree';
import * as _ from 'lodash';
/**
 * Food data with nested structure.
 * Each node has a name and an optional list of children.
 */
interface ITestRunnerNode {
  nodeType: string;
  name: string;
  manualId: number;
  parentNodeId?: number;
  children?: ITestRunnerNode[];
  uniqueId?: number;
}

enum NodeType {
  Login,
  ReleaseCode,
}

@Component({
  selector: 'app-generate-tree',
  templateUrl: './generate-tree.component.html',
  styleUrls: ['./generate-tree.component.scss'],
})
export class GenerateTreeComponent implements OnInit {
  treeControl = new NestedTreeControl<ITestRunnerNode>((node) => node.children);
  dataSource = new MatTreeNestedDataSource<ITestRunnerNode>();
  activeNode = <ITestRunnerNode>{};
  TREE_DATA: ITestRunnerNode[] = [
    { name: 'Login', manualId: 9, nodeType: NodeType[NodeType.Login] },
    {
      name: 'Fruit',
      manualId: 10,
      nodeType: 'Group',
      children: [
        { name: 'Apple', manualId: 11, nodeType: 'Set', parentNodeId: 10 },
        { name: 'Banana', manualId: 12, nodeType: 'Set', parentNodeId: 10 },
        {
          name: 'Fruit loops',
          manualId: 13,
          nodeType: 'Set',
          parentNodeId: 10,
        },
      ],
    },
    {
      name: 'Vegetables',
      manualId: 14,
      nodeType: 'Group',
      children: [
        {
          name: 'Broccoli',
          manualId: 16,
          nodeType: 'Set',
          parentNodeId: 14,
        },
        {
          name: 'Brussels sprouts',
          manualId: 17,
          nodeType: 'Set',
          parentNodeId: 14,
        },
      ],
    },
    //{ name: 'NoChildGroup2', nodeId: 15, nodeType: 'Group' },
    {
      name: 'Orange',
      manualId: 18,
      nodeType: 'Group',
      children: [
        {
          name: 'Pumpkins',
          manualId: 19,
          nodeType: 'Set',
          parentNodeId: 18,
        },
        {
          name: 'Carrots',
          manualId: 20,
          nodeType: 'Set',
          parentNodeId: 18,
        },
      ],
    },
    {
      name: 'Release Code',
      manualId: 21,
      nodeType: NodeType[NodeType.ReleaseCode],
    },
  ];
  fullFlatTree: ITestRunnerNode[] = [];
  tabs: ITestRunnerNode[] = [];
  selected: number = -1;
  specialNodeTypes!: (string | NodeType)[];
  uniqueId = 1;
  constructor() {
    this.dataSource.data = this.TREE_DATA;
  }

  ngOnInit(): void {
    // //loads enum as string array
    // this.specialNodeTypes = Object.values(NodeType).filter(
    //   (x) => typeof x === 'string'
    // );

    this.TREE_DATA.forEach((node) => {
      let tempNode: ITestRunnerNode = <ITestRunnerNode>this.cloneObject(node);
      let insertedNode = this.insertRunnerNode(tempNode);

      node.children?.forEach((child) => {
        let tempChild: ITestRunnerNode = <ITestRunnerNode>(
          this.cloneObject(child)
        );
        this.insertRunnerNode(tempChild, insertedNode.uniqueId);
      });
    });
    console.table(this.fullFlatTree);
    this.changeActiveNodeAndLoadTabs(this.TREE_DATA[0]);

    this.treeControl.expand(this.activeNode);
  }

  public cloneObject(obj: any): any {
    let serializedObj = JSON.stringify(obj);
    return JSON.parse(serializedObj);
  }

  insertRunnerNode(node: ITestRunnerNode, parentId?: number) {
    node.uniqueId = this.uniqueId;
    node.parentNodeId = parentId;
    this.fullFlatTree.push(node);
    this.uniqueId++;
    return node;
  }

  hasChild = (_: number, node: ITestRunnerNode) =>
    !!node.children && node.children.length > 0;

  onNodeClick(node: ITestRunnerNode) {
    if (node.nodeType === 'Group' && node.children) {
      let index = this.getGroupNodeIndexByNodeId(node);
      if (index !== -1) {
        this.treeControl.expand(this.TREE_DATA[index]);

        this.tabs = this.TREE_DATA[index].children!;
      }
      this.activeNode = this.getNextSelectableNode(<number>node.uniqueId);
      this.selected = 0;
    } else {
      this.changeActiveNodeAndLoadTabs(node);
      let parentIndex = this.getParentNodeIndexByParentNodeId(this.activeNode);
      if (parentIndex !== -1) {
        let nodeChildren = this.TREE_DATA[parentIndex].children;
        let activeNodeIndexInParent = nodeChildren?.findIndex(
          (x) => x.uniqueId === this.activeNode.uniqueId
        ) as number;
        this.selected = activeNodeIndexInParent;
      } else if (node.nodeType !== 'Group') {
        this.selected = -1;
      }
    }
  }

  onSaveClick() {}

  getClickedNode(): string {
    return this.activeNode.name;
  }

  onPreviousClick() {
    if (this.activeNode.uniqueId !== this.fullFlatTree[0].uniqueId) {
      let previousNode = this.getPreviousSelectableNode(
        <number>this.activeNode.uniqueId
      );
      if (
        previousNode.parentNodeId &&
        this.activeNode.parentNodeId !== previousNode.parentNodeId
      ) {
        let children: ITestRunnerNode[] = this.getChildrenForParent(
          previousNode.parentNodeId!
        );
        console.log(children);
        this.selected = children.length;
      }
      this.changeActiveNodeAndLoadTabs(previousNode);
      if (this.selected > 0) {
        this.selected = this.selected - 1;
      }
    }
  }

  getChildrenForParent(parentNodeId: number): ITestRunnerNode[] {
    if (parentNodeId !== undefined) {
      let index = this.fullFlatTree.findIndex(
        (x) => x.uniqueId === parentNodeId
      );
      let node: ITestRunnerNode = this.fullFlatTree[index];
      return node.children!;
    }
    return [];
  }

  getPreviousSelectableNode(nodeId: number): ITestRunnerNode {
    let index = this.fullFlatTree.findIndex((x) => x.uniqueId === nodeId);
    let node: ITestRunnerNode = this.fullFlatTree[index - 1];
    if (node.nodeType === 'Group') {
      return this.getPreviousSelectableNode(<number>node.uniqueId);
    }

    return node;
  }

  onNextClick() {
    if (
      this.activeNode.uniqueId !==
      this.fullFlatTree[this.fullFlatTree.length - 1].uniqueId
    ) {
      let nextNode = this.getNextSelectableNode(
        <number>this.activeNode.uniqueId
      );
      if (this.activeNode.parentNodeId !== nextNode.parentNodeId) {
        this.selected = -1;
      }
      this.changeActiveNodeAndLoadTabs(nextNode);

      if (this.selected < this.tabs.length) {
        this.selected = this.selected + 1;
      }
    }
  }

  changeActiveNodeAndLoadTabs(node: ITestRunnerNode) {
    this.activeNode = node;
    this.loadTabs();
  }
  getNextSelectableNode(nodeId: number): ITestRunnerNode {
    let index = this.fullFlatTree.findIndex((x) => x.uniqueId === nodeId);
    let node: ITestRunnerNode = this.fullFlatTree[index + 1];
    if (node.nodeType === 'Group') {
      return this.getNextSelectableNode(<number>node.uniqueId);
    }
    return node;
  }

  loadTabs() {
    let idx = this.getParentNodeIndexByParentNodeId(this.activeNode);
    if (idx !== -1) {
      this.treeControl.expand(this.TREE_DATA[idx]);

      this.tabs = this.TREE_DATA[idx].children!;
    } else {
      this.tabs = [];
    }
  }

  getParentNodeIndexByParentNodeId(node: ITestRunnerNode) {
    if (node.parentNodeId !== undefined) {
      let parentNodeIndex = this.TREE_DATA.findIndex(
        (x) => x.uniqueId === node.parentNodeId
      );
      return parentNodeIndex;
    }
    return -1;
  }

  getGroupNodeIndexByNodeId(node: ITestRunnerNode) {
    if (node.uniqueId !== undefined) {
      let groupNodeIndex = this.TREE_DATA.findIndex(
        (x) => x.uniqueId === node.uniqueId
      );
      return groupNodeIndex;
    }
    return -1;
  }

  getGroupNodeFromTree(node: ITestRunnerNode) {
    let nodeIndex = this.TREE_DATA.findIndex(
      (x) => x.uniqueId === node.uniqueId
    );
    return nodeIndex;
  }

  onTabClick(index: number) {
    if (index > -1) {
      this.activeNode = this.tabs[index];
    }
  }

  isLastNode(): boolean {
    // if (this.activeNode !== null || this.activeNode !== undefined) {
    if (this.activeNode) {
      if (
        this.activeNode.uniqueId ===
        this.fullFlatTree[this.fullFlatTree.length - 1].uniqueId
      ) {
        return true;
      }
      return false;
    }
    return false;
  }

  isFirstNode(): boolean {
    if (this.activeNode) {
      if (this.activeNode.uniqueId === this.fullFlatTree[0].uniqueId) {
        return true;
      }
      return false;
    }
    return false;
  }
}
