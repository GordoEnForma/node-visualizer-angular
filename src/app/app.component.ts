import { Component } from '@angular/core';
import { MiniMapPosition } from '@swimlane/ngx-graph';
import { debounceTime } from 'rxjs/operators';
import { Subject } from 'rxjs';
import {
  bodegaAcme_ProbarFlujo,
  flujoBitel_PROBAR_CODIGO,
  cardTypes,
  flujazo,
  redirectCards,
  cards as blockCards,
  acmeFlow,
  flujoSDV1_BITEL,
  flujoPacifico,
} from './flow';
import * as shape from 'd3-shape';

@Component({
  selector: 'app-root',
  
  template: `
  <div style="height: 1000px;">
    <ng-container>
        <app-actions-container [moveCondition]="moveGraph" (toggleMoveGraph)="toggleMoveGraph()"></app-actions-container>
    </ng-container>
    <ngx-graph  
      [zoomLevel]="zoomLevel"  
      [panningEnabled]="moveGraph"  
      [curve]="curve" 
      [clusters]="clusters" 
      layout="dagreCluster"  
      [nodes]="nodes" 
      [links]="links"  
      [draggingEnabled]="false"
      (zoomChange)="handleZoomChange($event)"
      >
        <ng-template #defsTemplate>
          <svg:marker id="arrow" viewBox="0 -5 10 10" refX="8" refY="0" markerWidth="4" markerHeight="4" orient="auto">
            <svg:path d="M0,-5L10,0L0,5" class="arrow-head" />
          </svg:marker>
        </ng-template>
        <ng-template #clusterTemplate let-cluster>
          <svg:g class="node cluster">
            <svg:rect
              rx="5"
              ry="5"
              [attr.width]="cluster.dimension.width"
              [attr.height]="cluster.dimension.height"
              [attr.fill]="cluster.data.color"
            />
            <svg:text 
              class="cluster-label" 
              text-anchor="middle" 
              [attr.font-size]="40" 
              alignment-baseline="middle"
              [attr.x]="cluster.dimension.width / 2"
              
              >

                    {{'Bloque: ' + cluster.label}}

            </svg:text>
          </svg:g>
      </ng-template>
        <ng-template #nodeTemplate let-node>
          <svg:g class="node" (click)="handleNodeClick(node)">
            <svg:circle
            class="node-circle"
              [attr.fill]="node.options.color"
              [attr.r]="node.dimension.width / 2"
              [attr.cx]="node.dimension.width / 2"
              [attr.cy]="node.dimension.height / 2"
              [attr.stroke]="node.options.stroke"
            ></svg:circle>
            
            <!-- *ngIf="node.info.config?.conditionenabled" -->
            <svg:text 
            *ngIf="node.type === 'conditional'"
              class="node-label"
                [attr.font-size]="node.options.fontSize"
                [attr.fill]="node.options.labelColor"
                [attr.background-color]="'white'"
                alignment-baseline="top"
                text-anchor="middle"
                [attr.x]="node.dimension.width / 2"
                [attr.y]="calculateYPosition(node.conditionLabel)"
              
            >
              <tspan *ngFor="let condition of node.conditionLabel.split('\n')"  x="55" dy="1.3em"> {{ condition}}</tspan>
              <!-- {{ node.conditionLabel }} -->
            </svg:text>
            <svg:text
            class="node-label"
              [attr.font-size]="node.options.fontSize"
              [attr.fill]="node.options.labelColor"

              alignment-baseline="top"
              text-anchor="middle"
              [attr.x]="node.dimension.width / 2"
              [attr.y]="node.dimension.height / 2"
            >
              {{ node.label }}
            </svg:text>
          </svg:g>
        </ng-template>
        <ng-template #linkTemplate let-link>
          <svg:g class="edge">
            <svg:path class="line" stroke-width="5" marker-end="url(#arrow)"></svg:path>
            <!-- <svg:text class="edge-label" text-anchor="middle"  >
              <textPath
                class="text-path"
                [attr.href]="'#' + link.id"
                [style.dominant-baseline]="link.dominantBaseline"
                startOffset="50%"
                [attr.font-size]="20"
              >
                {{link.label}}
              </textPath>
            </svg:text> -->
          </svg:g>
        </ng-template>
      </ngx-graph>
      <ng-container>
        <app-zoom-container [ngClass]="{moveClass: this.selectedNode?.isOpen}" (changeZoomLevel)="changeZoomLevel($event)" [zoomLevel]="zoomLevel"></app-zoom-container>
      </ng-container>
      <ng-container>
        <app-node-container  [node]="selectedNode" *ngIf="this.selectedNode?.isOpen"></app-node-container>
      </ng-container>
  </div>
  `,
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ngxGraphExampleV2';
  nodes = [];
  links = [];
  clusters = [];
  minimapPosition = MiniMapPosition.UpperLeft;
  curve = shape.curveStep;

  moveGraph: boolean = true;
  zoomLevel: number = 0.4;
  selectedNode: any;


  private zoomChangeSubject = new Subject<number>();
  private zoomChange$ = this.zoomChangeSubject.pipe(debounceTime(100));


  toggleMoveGraph() {
    this.moveGraph = !this.moveGraph;
  }
  changeZoomLevel(zoomLevel: number) {
    this.zoomLevel = zoomLevel;
  }

  handleZoomChange(newZoomLevel: number) {
    this.zoomChangeSubject.next(newZoomLevel);
  }
  // console.log(this.moveGraph)
  calculateYPosition(conditionalLabel: string): number {
    // console.log(conditionalLabel);
    if (!conditionalLabel) return 0;
    const conditions = conditionalLabel.split('\n');
    const lineHeight = -20;
    // console.log(conditions.length);
    return lineHeight * conditions.length;
  }
  handleNodeClick(node: any) {
    // console.log(this.selectedNode)
    // console.log(node);
    if (this.moveGraph) return;
    if (node?.type === 'conditional') return;
    this.selectedNode = { ...node };

    this.selectedNode.isOpen = true;
    console.log(this.selectedNode)

  }

  ngOnInit() {
    this.zoomChange$.subscribe((newZoomLevel) => {
      this.zoomLevel = newZoomLevel;
    });
    const { nodes, links, clusters } = this.getNodesAndLinksFromBlocks(flujoPacifico);
    // const { nodes, links, clusters } = this.getNodesAndLinksFromBlocks2(flow);
    //check if any link.id in links is duplicated (it should not)
    const duplicatedLinks = links.filter((link, index, self) =>
      index !== self.findIndex((t) => (
        t.id === link.id
      ))
    );
    console.log(duplicatedLinks);
    function findNodeById(nodes: any[], id: string) {
      return nodes.find(node => node.id === id);
    }
    function findLinkById(links: any[], id: string) {
      return links.find(link => link.id === id);
    }

    console.log(findNodeById(nodes, '67dea444-0383-900c-191c-599804c38457'));
    console.log(findLinkById(links, '67dea444-0383-900c-191c-599804c38457'));
    // console.log(links);
    this.nodes = nodes;
    this.links = links;
    this.clusters = clusters.filter(cluster => cluster.childNodeIds.length > 0);
  }

  getNodesAndLinksFromBlocks(flow) {
    let nodes = [];
    let links = [];
    let clusters = [];
    let allBlocks = flow.blockgroup.flatMap(blockGroup => blockGroup.blocks);
    let currentId = 0;
    let blockGroups = {};


    function getLinkRelational(card, currentId) {
      let relationalLinks = [];
      let cardType = card.typename;
      let idLinkSequence = 0; //IDS LOCALES PARA LINKS RELACIONADOS
      // console.info(card);
      let relationBlockId = 0;

      switch (cardType) {
        case "WhatsappCatalogCard":
          if (card.config.redirectonfailure) {
            relationBlockId = card.config.blockid.split("_")[1];
            const blockToFound = allBlocks.find(block => block.id === relationBlockId);
            const cardsOfTheBlockFounded = blockToFound?.cards;
            relationalLinks.push({
              // type: "REL_GALLERY",
              id: 'link_' + card.id + '_' + cardsOfTheBlockFounded[0].id,
              source: card.id,
              target: cardsOfTheBlockFounded[0].id,
              label: 'REDIRECT_WHATSAPP_CATALOG'
            });
          }
          if (card.config.redirectshopping) {
            relationBlockId = card.config.shopping_blockid.split("_")[1];
            const blockToFound = allBlocks.find(block => block.id === relationBlockId);
            const cardsOfTheBlockFounded = blockToFound?.cards;
            relationalLinks.push({
              // type: "REL_GALLERY",
              id: 'link_' + card.id + '_SHOPPING_' + cardsOfTheBlockFounded[0].id,
              source: card.id,
              target: cardsOfTheBlockFounded[0].id,
              label: 'REDIRECT_SHOPPING_WHATSAPP_CATALOG'
            });
          }
          break;
        case "PostbackCard":
          card.config.buttons.forEach((button) => {
            relationBlockId = button.blockid.split("_")[1];
            const blockToFound = allBlocks.find(block => block.id === relationBlockId);
            const cardsOfTheBlockFounded = blockToFound?.cards;
            relationalLinks.push({
              // type: "REL_GALLERY",
              id: 'link_' + card.id + '_' + cardsOfTheBlockFounded[0].id,
              source: card.id,
              target: cardsOfTheBlockFounded[0].id,
              label: 'REDIRECT_POSTBACK'
            });
          });
          if (card.config.redirectonfailure) {
            relationBlockId = card.config.blockid.split("_")[1];
            const blockToFound = allBlocks.find(block => block.id === relationBlockId);
            const cardsOfTheBlockFounded = blockToFound?.cards;
            relationalLinks.push({
              // type: "REL_GALLERY",
              id: 'link_' + card.id + '_FAILURE_' + cardsOfTheBlockFounded[0].id,
              source: card.id,
              target: cardsOfTheBlockFounded[0].id,
              label: 'REDIRECT_FAILURE_POSTBACK'
            });
          }
          break;
        case "GoToBlockCard":
          //let relationBlockId = card.  stringsmooch.split("_")[1];
          relationBlockId = card.config.blockid.split("_")[1];
          // console.log(relationBlockId);

          const blockFound = allBlocks.find(block => block.id === relationBlockId);
          // console.log(blockFound);
          const cardsOfTheBlockFound = blockFound?.cards;
          // console.log(cardsOfTheBlockFound.length);
          relationalLinks.push({
            // type: "REL",
            id: 'link_' + card.id + '_' + card.id,
            source: card.id,
            target: cardsOfTheBlockFound[0]?.id ? cardsOfTheBlockFound[0].id : card.id,
            label: 'REDIRECT_GOTO'
          });
          break;
        case "interactivebuttonCard":
          card.config.buttons.forEach((button) => {
            if (button.blockid) {
              relationBlockId = button.blockid.split("_")[1];
              const blockToFound = allBlocks.find(block => block.id === relationBlockId);
              const cardsOfTheBlockFounded = blockToFound?.cards;
              relationalLinks.push({
                // type: "REL_GALLERY",
                id: 'link_' + card.id + '_' + cardsOfTheBlockFounded[0].id,
                source: card.id,
                target: cardsOfTheBlockFounded[0].id,
                label: 'REDIRECT_INTERACTIVE_BUTTON'
              });
            }
          });

          break;
        case "interactivelistCard":
          card.config.sections.forEach((section) => {
            section.buttons.forEach((button) => {
              if (button.blockid) {
                relationBlockId = button.blockid.split("_")[1];
                const blockToFound = allBlocks.find(block => block.id === relationBlockId);
                // console.log(blockToFound)
                const cardsOfTheBlockFounded = blockToFound?.cards;
                // console.log(cardsOfTheBlockFounded);
                relationalLinks.push({
                  // type: "REL_GALLERY",
                  id: 'link_' + card.id + '_' + cardsOfTheBlockFounded[0].id,
                  source: card.id,
                  target: cardsOfTheBlockFounded[0].id,
                  label: 'REDIRECT_INTERACTIVE_LIST'
                });
              }
            });
          });

          break;
        case "GoToFlowCard":
          relationBlockId = card.config.blockid.split("_")[1];
          const blockToFound = allBlocks.find(block => block.id === relationBlockId);
          const cardsOfTheBlockFounded = blockToFound?.cards;
          relationalLinks.push({
            // type: "REL_GALLERY",
            id: 'link_' + card.id + '_' + cardsOfTheBlockFounded[0].id,
            source: card.id,
            target: cardsOfTheBlockFounded[0].id,
            label: 'REDIRECT_GOTOFLOW'
          });
          break;
        case "DefaultCommonTypeCard":
          //CARRUSEL
          if (card.config.gallerycards) {
            card.config.gallerycards.forEach((gallery) => {
              gallery.buttons.forEach((button) => {
                relationBlockId = button.blockid.split("_")[1];
                const blockToFound = allBlocks.find(block => block.id === relationBlockId);
                const cardsOfTheBlockFounded = blockToFound?.cards;
                relationalLinks.push({
                  // type: "REL_GALLERY",
                  id: 'link_' + card.id + '_' + cardsOfTheBlockFounded[0].id,
                  source: card.id,
                  target: cardsOfTheBlockFounded[0].id,
                  label: 'REDIRECT_CAROUSEL'
                });
              });
            });
          }
          if (card.config.redirectonfailure) {
            relationBlockId = card.config.blockid.split("_")[1];
            const blockToFound = allBlocks.find(block => block.id === relationBlockId);
            const cardsOfTheBlockFounded = blockToFound?.cards;
            relationalLinks.push({
              // type: "REL_GALLERY",
              id: 'link_' + card.id + '_FAILURE_' + cardsOfTheBlockFounded[0].id,
              source: card.id,
              target: cardsOfTheBlockFounded[0].id,
              label: 'REDIRECT_FAILURE_CAROUSEL'
            });
          }
          break;
        default:
      }
      return { relationalLinks };
    }
    function replaceConditional(conditiontype) {
      switch (conditiontype) {
        case 'schedule':
          return 'horario';
        case 'exist':
          return 'existe';
        case 'notexist':
          return 'no existe';
        case 'equals':
          return '=';
        case 'notequals':
          return '!=';
        case 'includes':
          return 'incluye';
        case 'notincludes':
          return 'no incluye';
        case 'greater':
          return '>';
        case 'greaterandequals':
          return '>=';
        case 'lower':
          return '<';
        case 'lowerandequals':
          return '<=';
        case 'intodomain':
          return 'en el dominio';
        case 'notintodomain':
          return 'no en el dominio';
        default:
          return '';
      }
    }
    function getCondicional(card) {
      let isConditional = card.config.conditionenabled;
      let condition = "";
      if (card.config?.conditionenabled) {
        card.config.cardconditions.forEach((x) => {
          condition += `${x.conditionvariable} ${replaceConditional(x.conditiontype)} ${x.conditionvalue} ${x.logicoperator === 'AND' ? 'Y' : (x.logicoperator === 'OR' ? 'O' : '')}\n`;
        });
      }
      return { isConditional, condition };
    }
    allBlocks.forEach((block, blockIndex) => {
      // console.log(block.id);
      let blockId = block.id;
      let cards = block.cards;
      let previousBlock = allBlocks[blockIndex - 1] ? allBlocks[blockIndex - 1] : null;
      let lastCardOfPreviousBlock = previousBlock ? previousBlock.cards[previousBlock.cards.length - 1] : null;
      let nextBlock = allBlocks[blockIndex + 1] ? allBlocks[blockIndex + 1] : null;
      let firstCardOfNextBlock = nextBlock ? (nextBlock.cards[0] ? nextBlock.cards[0] : null) : null;

      blockGroups[block.title] = [];
      const defaultOptions = {
        fontSize: 20,
        color: 'white',
        labelColor: 'black',
        stroke: 'black',
      }
      cards.forEach((card, cardIndex) => {

        let cardId = card.id;
        let cardLabel = card.pluginid;
        // console.log(cardLabel);
        blockGroups[block.title].push({ id: cardId, label: cardLabel, options: { ...defaultOptions, color: blockCards[cardLabel].color } });
        nodes.push({
          id: cardId, label: cardLabel, options: { ...defaultOptions, color: blockCards[cardLabel].color },
          dimension: { width: 150, height: 150 }, info: { ...card }, svgPathFile: blockCards[cardLabel].svgFilePath, type: 'Card'

        });


        if (card.config.conditionenabled) {
          links.pop();
          let { isConditional, condition } = getCondicional(card);
          if (isConditional) {
            let replacedConditional = condition.replace(/[^a-zA-Z0-9]/g, '_');
            nodes[nodes.length - 1].conditionLabel = condition;
            let conditionalNode = {
              id: 'condition_' + card.id + replacedConditional,
              label: 'Condicional',
              type: 'conditional',
              options: { ...defaultOptions, color: '#F5F5F5' },
              dimension: { width: 170, height: 170 },
              conditionLabel: condition,
            }
            nodes.push(conditionalNode);
            if (cardIndex === 0) {
              // console.log(lastCardOfPreviousBlock)
              // console.log(conditional)
              console.log('First card of the block')

              let conditionalToCardLink = {
                id: 'link_' + conditionalNode.id + card.id,
                source: conditionalNode.id,
                target: card.id,
                label: condition,
                // type: "REL_CONDITIONAL",
              }
              let cardToConditionalLink;
              let sourceCardToTargetCardLink;

              if (lastCardOfPreviousBlock) {
                cardToConditionalLink = {
                  id: 'link_' + lastCardOfPreviousBlock.id + conditionalNode.id,
                  source: lastCardOfPreviousBlock.id,
                  target: conditionalNode.id,
                  label: condition,
                  // type: "REL_CONDITIONAL",
                }

                sourceCardToTargetCardLink = {
                  id: `link_${lastCardOfPreviousBlock?.id}_${cards.length > 1 ? cards[cardIndex + 1]?.id : card.id}`,
                  source: lastCardOfPreviousBlock.id,
                  target: cards.length > 1 ? cards[cardIndex + 1]?.id : card.id,
                  label: 'Condition not met'
                }

                links.push(cardToConditionalLink);

                links.push(sourceCardToTargetCardLink);
              }
              links.push(conditionalToCardLink);

            } else if (cardIndex === cards.length - 1) {
              let cardToConditionalLink = {
                id: 'link_' + cards[cardIndex - 1].id + conditionalNode.id,
                source: cards[cardIndex - 1].id,
                target: conditionalNode.id,
                label: condition,
                // type: "REL_CONDITIONAL",
              }
              let conditionalToCardLink = {
                id: 'link_' + conditionalNode.id + '_' + cardId,
                source: conditionalNode.id,
                target: cardId,
                label: condition,
                // type: "REL_CONDITIONAL",
              }
              // console.log(firstCardOfNextBlock);
              // console.log(card);
              let sourceCardToTargetCardLink = {
                id: `link_${cards[cardIndex - 1].id}_${firstCardOfNextBlock ? firstCardOfNextBlock.id : 'END'}`,
                source: cards[cardIndex - 1].id,
                target: firstCardOfNextBlock ? firstCardOfNextBlock.id : cards[cardIndex - 1].id,
                label: 'No cumple la condición',
              }
              links.push(cardToConditionalLink);
              links.push(conditionalToCardLink);
              links.push(sourceCardToTargetCardLink);
            } else {
              console.table({ cardId: card.id, type: card.pluginid });

              let cardToConditionalLink = {
                id: 'link_' + cards[cardIndex - 1].id + conditionalNode.id,
                source: cards[cardIndex - 1].id,
                target: conditionalNode.id,
                label: 'Label',
                // type: "REL_CONDITIONAL",
              }
              let conditionalToCardLink = {
                id: 'link_' + cardId + '_' + conditionalNode.id + '_' + 'conditional',
                source: conditionalNode.id,
                target: card.id,
                label: 'Label',
                // type: "REL_CONDITIONAL",
              }

              let sourceCardToTargetCardLink = {
                id: 'link_' + cards[cardIndex - 1].id + '_' + cards[cardIndex + 1].id,
                source: cards[cardIndex - 1].id,
                target: cards[cardIndex + 1].id,
                label: 'Condition not met',
              }
              links.push(cardToConditionalLink);
              links.push(conditionalToCardLink);
              links.push(sourceCardToTargetCardLink);
            }
          }
        }
        if (redirectCards.includes(cardLabel)) {
          // getLinksFromRedirectCards(card, cardId, blockId, block, cardLabel);

          let { relationalLinks } = getLinkRelational(card, currentId);
          relationalLinks.forEach((relationalLink) => {
            links.push(relationalLink);
          });

        }
        if (cardIndex < cards.length - 1) {
          let link = {
            id: 'link_' + blockId + '_' + cardId + '_' + cards[cardIndex + 1].id,
            source: cardId,
            target: cards[cardIndex + 1].id
          }
          links.push(link);
        }
      })
      clusters.push({ id: blockId, label: block.title, childNodeIds: [...blockGroups[block.title].map(node => node.id)] })
    });

    console.log('nodes = ', nodes.length);
    console.log('links = ', links.length);
    console.log('nodes = ', nodes);
    console.log('links = ', links);
    // console.log(clusters);
    // console.log('blockGroups = ', blockGroups);

    return { nodes, links, clusters };
  }
}
